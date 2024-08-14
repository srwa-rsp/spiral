import db from "../../../../lib/db";
import OpenAI from "openai";
import { modelPrompt, responseStructure } from "../../../utils/consts";

const MODEL = "gpt-4o-mini";
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
export default async function handler(req, res) {
  if (req.method === "POST") {
    const answers = req.body;

    if (answers.length < 5) {
      return res.status(400).json({ error: "All Responses are required" });
    }
    try {
        for (const answerSet of answers) {
            await db('user-responses').insert({
              user_id: 1,
              question: answerSet.question,
              answers: JSON.stringify(answerSet.answers)
            });
          }

      const responseText = await client.chat.completions.create({
        model: MODEL,
        messages: [
          {
            role: "system",
            content: `${modelPrompt} The JSON response should be structured as follows ${responseStructure}`,
          },
          {
            role: "user",
            content: `generate feedback for this test result: ${JSON.stringify(answers)}`,
          },
        ],
      });
      let openAIResponseText = responseText.choices[0].message.content;
      openAIResponseText = openAIResponseText.replace(/```json|```/g, '');
      const openAIResponse = JSON.parse(openAIResponseText);

      await db('user_result').insert({
        user_id:1, 
        stages: JSON.stringify(openAIResponse.stages), 
        feedback: openAIResponse.feedback, 
        roadmap_vertical: JSON.stringify(openAIResponse.roadmapForVerticalGrowth),
        roadmap_horizontal: JSON.stringify(openAIResponse.roadmapForHorizontalGrowth),
      });
      res.status(201).json({message: "successfully submitted!"});
    } catch (error) {
      console.error("Error Posting responses:", error);
      res.status(500).json({ error: "Failed to post responses" });
    }
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
