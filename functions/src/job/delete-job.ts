import { Request, Response } from "express";
import getClient from "../prisma-client";

export default async function deleteJob(req: Request, res: Response) {
  const { id } = req.query as any;

  const client = await getClient();
  await client.job.delete({
    where: { id },
  });

  return res.status(200).json({ message: "job deleted successfully" });
}
