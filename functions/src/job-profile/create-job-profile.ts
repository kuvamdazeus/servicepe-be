import { Request, Response } from "express";
import getClient from "../prisma-client";

export default async function createJobProfile(req: Request, res: Response) {
  try {
    const client = await getClient();
    await client.jobProfile.create({
      data: { ...req.body, user_id: req.userId },
    });

    return res.status(200).json({ message: "created job profile" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "error creating job profile, bad request" });
  }
}
