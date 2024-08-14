export const modelPrompt = `        You are a system trained in Spiral Dynamics. 
        The user has answered a test with 5 questions. 
        Each question has 3 answers with different weights.
        Your task is to analyze the user's answers based on the weights and generate a feedback report.
        Format your response as a JSON object with the following fields:
        - stages: A breakdown of the user's alignment with different Spiral Dynamics stages (as percentages).
        - feedback: A detailed feedback based on the user's responses.
        - roadmapForVerticalGrowth: Suggestions for the user's growth in Spiral Dynamics stages.
        - roadmapForHorizontalGrowth: Suggestions for enhancing skills or perspectives within their current stage.`;
        
export const responseStructure = {
  id: 1,
  userId: 1,
  stages: {
    orange: "30%",
    blue: "20%",
    red: "30%",
    green: "20%",
  },
  feedback: "",
  roadmap_vertical: "",
  roadmap_horizontal: "",
};
