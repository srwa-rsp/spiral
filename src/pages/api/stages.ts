import db from "../../../lib/db";
import { getToken } from "next-auth/jwt";
import type { NextApiRequest, NextApiResponse } from 'next'


export default async function handler(req:NextApiRequest, res:NextApiResponse) {
  const token = await getToken({ req });

  if (req.method === "GET") {
    if (token) {
      try {
        const stages = await db("stages").select("*");

        res.status(200).json(stages);
      } catch (error) {
        console.error("Error fetching stages:", error);
        res.status(500).json({ error: "Failed to fetch stages" });
      }
    }else {
      res.status(401).json({ message: "Unauthorized access - please log in." });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
