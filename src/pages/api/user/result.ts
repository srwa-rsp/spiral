import db from "../../../../lib/db";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const result = await db("user_result")
        .select("*")
        .orderBy("id", "desc")
        .first();

      res.status(200).json(result);
    } catch (error) {
      console.error("Error fetching result:", error);
      res.status(500).json({ error: "Failed to fetch result" });
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
