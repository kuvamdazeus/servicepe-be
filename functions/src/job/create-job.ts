import { Request, Response } from "express";
import getClient from "../prisma-client";

export default async function createJob(req: Request, res: Response) {
  const client = await getClient();
  await client.job.create({
    data: {
      ...req.body,
      user_id: req.userId,
    },
  });

  return res.status(200).json({ message: "job created successfully" });
}
