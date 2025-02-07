import db from "../../../../lib/db.js";
import { getToken } from "next-auth/jwt";
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const token = await getToken({ req });
  const userId = Number(token?.id);
  if (req.method === "GET") {
    if (token) {
      try {
        const result = await db("user_result").where("user_id", userId).select("*").orderBy("id", "desc").first();
        res.status(200).json(result);
      } catch (error) {
        console.error("Error fetching result:", error);
        res.status(500).json({ error: "Failed to fetch result" });
      }
    } else {
      res.status(401).json({ message: "Unauthorized access - please log in." });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
