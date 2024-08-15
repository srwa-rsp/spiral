"use-client";
import { useGetStages } from "@/utils/services";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { colors } from "@/utils/consts";

const index = () => {
  const { data: session, status } = useSession();
  const [stages, setStages] = useState([]);
  const router = useRouter();

  console.log(status)
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login");
    }
  }, [router, status]);

  useEffect(() => {
    const getStages = async () => {
      try {
        const response = await useGetStages();
        setStages(response);
      } catch (error) {
        console.log("Error getting Stages");
      }
    };
    getStages();
  }, []);
  if (stages.length == 0) {
    return <h1>loading...</h1>;
  }
  if (status === "authenticated") {
    return (
      <>
        <section id="hero" className="bg-[url('../assets/images/spiral-hero.png')] bg-cover bg-center h-[50vh] flex justify-center items-center">
          <h2 className="text-[3rem] text-white drop-shadow-md mix-blend-difference">Unlock the Secrets Behind Your Perception of the World</h2>
        </section>
        <section id="stages" className="flex flex-col gap-3 p-6">
          {stages?.map(stage => (
            <div key={stage.id} className={` flex flex-col gap-1 p-6 rounded`} style={{backgroundColor: `${colors[stage.color]}`}}>
              <h4 className="font-semibold">{stage.name}</h4>
              <p><span>Description: </span>{stage.description}</p>
              <p><span>Challenges:</span>{stage.challenges}</p>
            </div>
          ))}
        </section>
      </>
    );
  } else {
    return <div>Redirecting...</div>;
  }
};

export default index;
