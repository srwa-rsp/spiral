import { ResultData } from "@/types/interfaces/UserInterface.ts";

export const modelPrompt = `        You are a system trained in Spiral Dynamics. 
        The user has answered a test with 5 questions. 
        Each question has 3 answers with different weights.
        Your task is to analyze the user's answers based on the weights and generate a feedback report.
        Format your response as a JSON object with the following fields:
        - stages: A breakdown of the user's alignment with different Spiral Dynamics stages (as percentages).
        - feedback: A detailed feedback based on the user's responses.
        - roadmapForVerticalGrowth: Suggestions for the user's growth in Spiral Dynamics stages. it must be an array with 3 string items.
        - roadmapForHorizontalGrowth: Suggestions for enhancing skills or perspectives within their current stage.it must be an array with 3 string items`;

export const responseStructure:ResultData = {
  id: 1,
  user_id: 1,
  stages: {
    orange: "30%",
    blue: "20%",
    red: "30%",
    green: "20%",
  },
  feedback: "",
  roadmap_vertical:[ "", "",""],
  roadmap_horizontal: [ "", "",""],
};

export const referenceColors = [
  {
    name: "Archaic",
    color: "beige",
  },
  {
    name: "Magic",
    color: "purple",
  },
  {
    name: "Imperial",
    color: "red",
  },
  {
    name: "Diplomatic",
    color: "amber",
  },
  {
    name: "Achiever",
    color: "orange",
  },
  {
    name: "Individualist",
    color: "green",
  },
  {
    name: "Strategist",
    color: "teal",
  },
  {
    name: "Alchemist",
    color: "turquoise",
  },
  {
    name: "Unitive",
    color: "indigo",
  },
];

export const colors: Record<string, string>  = {
  beige: "#f5f5dc",
  purple: "#e6e6fa",
  red: "#ffcccc",
  amber: "#60a5fa",
  orange: "#ffdab9",
  green: "#ccffcc",
  teal: "#e0f7fa",
  turquoise: "#afeeee",
  indigo: "#4b008259",
};
