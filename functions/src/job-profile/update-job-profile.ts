import { Request, Response } from "express";
import getClient from "../prisma-client";

export default async function updateJobProfile(req: Request, res: Response) {
  const jobProfile = req.body;

  const client = await getClient();
  await client.jobProfile.update({
    where: { id: jobProfile.id },
    data: jobProfile,
  });

  return res.status(200).json({ message: "job updated successfully" });
}
