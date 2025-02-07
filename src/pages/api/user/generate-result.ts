import db from "../../../../lib/db.js";
import OpenAI from "openai";
import {
  modelPrompt,
  responseStructure,
  referenceColors,
} from "../../../utils/consts.ts";
import { getToken } from "next-auth/jwt";
import type { NextApiRequest, NextApiResponse } from 'next'


const MODEL = "gpt-4o-mini";
const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const token = await getToken({ req });
  if (req.method === "POST") {
    if (token) {
      const answers = req.body;
      if (answers.length < 5) {
        return res.status(400).json({ error: "All Responses are required" });
      }
      try {
        for (const answerSet of answers) {
          await db("user-responses").insert({
            user_id: token.id,
            question: answerSet.question,
            answers: JSON.stringify(answerSet.answers),
          });
        }

        const responseText = await client.chat.completions.create({
          model: MODEL,
          messages: [
            {
              role: "system",
              content: `${modelPrompt} The JSON response should be structured as follows: ${responseStructure}.Here is a reference object for the stage and color names:${JSON.stringify(
                referenceColors
              )}.Always use the color names specified in the reference object for result stage percentages`,
            },
            {
              role: "user",
              content: `generate feedback for this test result: ${JSON.stringify(
                answers
              )}`,
            },
          ],
        });
        let openAIResponseText:string | null = responseText.choices[0].message.content;
        openAIResponseText = openAIResponseText?.replace(/```json|```/g, "") ?? "";
        const openAIResponse = JSON.parse(openAIResponseText);

        await db("user_result").insert({
          user_id:token.id,
          stages: JSON.stringify(openAIResponse.stages),
          feedback: openAIResponse.feedback,
          roadmap_vertical: JSON.stringify(
            openAIResponse.roadmapForVerticalGrowth
          ),
          roadmap_horizontal: JSON.stringify(
            openAIResponse.roadmapForHorizontalGrowth
          ),
        });
        res.status(201).json({ message: "successfully submitted!" });
      } catch (error) {
        console.error("Error Posting responses:", error);
        res.status(500).json({ error: "Failed to post responses" });
      }
    } else {
      res.status(401).json({ message: "Unauthorized access - please log in." });
    }
  } else {
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
