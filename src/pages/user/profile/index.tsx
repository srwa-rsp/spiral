import { useGetResult } from "@/utils/services";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import avatar from '@/assets/images/avatar.png'
import { PieChart, Pie, Sector, Cell } from 'recharts';
import { colors } from "@/utils/consts";

const index = () => {
  const [result, setResult] = useState([]);
  const [chartData, setChartData] = useState([])

  useEffect(() => {
    const getResult = async () => {
      try {
        const response = await useGetResult();
        setResult(response);
        const data = Object.entries(response.stages).map(([name, value]) => ({ name, value }));
        setChartData(data)
      } catch (error) {
        console.log(error);
      }
    };
    getResult();
  }, []);
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);
    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
      {percent != 0 &&  `${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
if (result.length == 0) {
    return <h1>loading...</h1>;
  }
return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex flex-col md:flex-row justify-between">
        <div className=" basis-1"><Image width={100} height={120} src={avatar} alt={"avatar"} />
        <p className="min-w-[20rem]">{result?.feedback}</p>
        </div>
        <div className=" basis-2">
 
        <PieChart width={400} height={400}>
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
 
        </div>
      </div>
      <div className="flex flex-col gap-6 md:flex-row">
       <div><h4 className="text-[1.5rem] h-20" >Growth into other Spiral Dynamics stages</h4>
       {result.roadmap_vertical.map((item: string, index: number) => (
        <p key={index} className="p-2 border-1 mb-2 rounded shadow-md">{item}</p>
       ))
       }
       </div>
       <div><h4 className="text-[1.5rem] h-20" >Enhancing skills or perspectives within your current stage</h4>
       {result.roadmap_horizontal.map((item: string, index:number) => (
        <p key={index} className="p-2 border-1 mb-2 rounded shadow-md">{item}</p>
       ))
       }</div> 
        
      </div>
    </div>
  );
};

export default index;
