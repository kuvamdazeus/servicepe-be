import { Request, Response } from "express";
import getClient from "../prisma-client";

export default async function updateJob(req: Request, res: Response) {
  const job = req.body;

  const client = await getClient();
  await client.job.update({
    where: { id: job.id },
    data: job,
  });

  return res.status(200).json({ message: "job updated successfully" });
}
