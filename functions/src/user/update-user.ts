import { Request, Response } from "express";
import getClient from "../prisma-client";

// TASK: take in attributes to be updated & return new user
export default async function updateUser(req: Request, res: Response) {
  try {
    const client = await getClient();
    const newUser = await client.user.update({
      where: { id: req.userId },
      data: req.body,
      include: { jobProfiles: true, jobs: true },
    });

    if (!newUser) throw new Error("error, no user returned!");

    return res.status(201).json(null);
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "error updating user, check logs" });
  }
}
