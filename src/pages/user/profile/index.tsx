import { useGetResult } from "@/utils/services";
import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell } from "recharts";
import { colors } from "@/utils/consts";
import { ChartData } from "@/types/interfaces/StagesInterface";
import { ResultData } from "@/types/interfaces/UserInterface";
import Spinner from "@/components/spinner/Spinner";
import { useSession } from "next-auth/react";
import { toast } from "react-toastify";

const index = () => {
  const [result, setResult] = useState<ResultData | null>(null);
  const [chartData, setChartData] = useState<ChartData[]>([]);
  const { status } = useSession();

  useEffect(() => {
    const getResult = async () => {
      try {
        const response = await useGetResult();
        setResult(response);
        const data = Object.entries(response.stages).map(([name, value]) => ({
          name,
          value: Number(value),
        }));
        setChartData(data);
      } catch (error: any) {
        toast.error(error);
      }
    };
    getResult();
  }, []);
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {percent != 0 && `${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  if (result === null) {
    return (
      <div className="flex justify-center items-center h-screen ">
        <Spinner />
      </div>
    );
  }
  if (status === "authenticated") {
    return (
      <div className="flex flex-col gap-6 px-6 py-12 md:px-16 ">
        <div className="flex flex-col md:flex-row justify-between items-center p-20">
          <div className=" max-w-[35rem] ">
            <h2 className="font-bold text-[2.5rem]">Your Profile</h2>
            <p className="">{result?.feedback}</p>
          </div>
          <div className=" flex flex-col gap-2 items-center justify-center ">
            <PieChart width={300} height={200}>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={colors[entry.name]} />
                ))}
              </Pie>
            </PieChart>
            <p className="text-[0.8rem]">
              Distribution Across Spiral Dynamics Stages{" "}
            </p>
          </div>
        </div>
        <div className="flex flex-col gap-6 md:flex-row">
          <div className="px-6 border-b-2 border-gray-200 md:border-b-0 md:border-r-2">
            <h4 className="text-[1.5rem] h-20">
              Growth into other Spiral Dynamics stages
            </h4>
            {result?.roadmap_vertical.map((item: string, index: number) => (
              <p key={index} className="p-2 border-1 mb-2 rounded shadow-md">
                {item}
              </p>
            ))}
          </div>
          <div>
            <h4 className="text-[1.5rem] h-20">
              Enhancing skills within your current stages
            </h4>
            {result?.roadmap_horizontal.map((item: string, index: number) => (
              <p key={index} className="p-2 border-1 mb-2 rounded shadow-md">
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>
    );
  }
};

export default index;
