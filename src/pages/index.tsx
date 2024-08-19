"use-client";
import { useGetStages } from "@/utils/services";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { colors } from "@/utils/consts";
import Link from "next/link";
import Image from "next/image";
import { Spinner } from "@nextui-org/react";
import circle from '@/assets/images/Circle.svg'
import spiral from '@/assets/images/Spiral.svg'

const index = () => {
  const { data: session, status } = useSession();
  const [stages, setStages] = useState([]);
  const router = useRouter();

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
    return (
      <div className="flex justify-center items-center h-screen ">
        <Spinner />
      </div>
    );;
  }
  if (status === "authenticated") {
    return (
      <>
        <section
          id="hero"
          className="relative h-screen flex flex-col justify-center items-center px-10 "
        >
          <div className="pb-20 relative overflow-hidden">
            <h2 className=" pl-20 text-[2rem] font-bold drop-shadow-md self-start ">
              Your Personal Growth Coach
            </h2>
            <h2 className="relative text-[3rem] font-bold drop-shadow-md text-center ">
              Unlock the Secrets Behind Your Perception of the World
            </h2>
            <Image width={300} src={circle} alt={""} className=" absolute left-10 bottom-20 -z-10" />
            <Image width={300} src={spiral} alt={""} className=" absolute right-10 top-20 -z-10" />
          </div>
          <div className="p-6">
            <div className=" flex flex-col md:flex-row gap-6 ">
              <div className="border-2 border-gray-200 rounded p-4">
                <h3 className="pb-6">Unveiling Your Worldview</h3>
                <p>
                  Discover your worldview through the lens of Spiral Dynamics.
                  Uncover the invisible glasses shaping your perception and
                  embark on a unique journey of self-understanding.
                </p>
              </div>
              <div className="border-2 border-gray-200 rounded p-4">
                <h3 className="pb-6">Beyond Limitations</h3>
                <p>
                  Identify the benefits and boundaries of your current
                  perspective. Spiral guides you to envision and reach beyond
                  your present stage.
                </p>
              </div>
              <div className="border-2 border-gray-200 rounded p-4">
                <h3 className="pb-6 ">The Evolution of Consciousness</h3>
                <p>
                  Witness the unfolding evolution of human consciousness. Spiral
                  illuminates the path, inviting you to join the continuous flow
                  of growth and connection. Embrace the journey to see the world
                  and yourself in a new light.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="flex justify-between p-6">
          <div className="basis-1/2 p-8">
            <h3 className="py-6 font-bold">What is Spiral Dynamics?</h3>
            <p>
              Spiral Dynamics is a captivating map of human development that
              explores the evolving nature of our values, beliefs, and
              behaviors. Imagine a spiral, where each turn represents a distinct
              stage of consciousness that humanity progresses through. From
              basic survival to complex societal structures, and eventually to
              global interconnectedness, Spiral Dynamics outlines how our
              perspectives evolve in response to life's challenges.
            </p>
          </div>
          <div className="basis-1/2 p-8">
            <h3 className="py-6 font-bold">Why it is important?</h3>
            <p>
              This theory isn't just about individual growth; it's a lens
              through which we can understand the movements of societies,
              businesses, and cultures. It reveals why we think and act the way
              we do, and how our collective viewpoints shift over time. This
              knowledge not only enhances personal insight and empathy but also
              aids in navigating complex social dynamics. By grasping the stages
              of consciousness, we can foster better communication and more
              harmonious relationships, making Spiral Dynamics a valuable tool
              for personal and collective development.
            </p>
          </div>

        </section>

        <section id="stages" className="flex flex-wrap gap-6 p-6 justify-center">
          {stages?.map((stage) => (
            <div
              key={stage.id}
              className={` flex flex-col gap-1 p-6 rounded border-l-4 min-w-[20rem] max-w-[25rem] `}
              style={{ borderColor: `${colors[stage.color]}` }}
            >
              <h4 className="font-bold">{stage.name}</h4>
              <p>
                {stage.description}
              </p>
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
