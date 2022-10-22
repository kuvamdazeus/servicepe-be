import { Request, Response } from "express";
import getClient from "../prisma-client";

export default async function findUser(req: Request, res: Response) {
  try {
    console.log(req.userId);
    const client = await getClient();

    const user = await client.user.findUniqueOrThrow({
      where: { id: req.userId },
      include: { jobProfiles: true, jobs: true },
    });

    return res.status(200).json({ ...user, dob: parseInt(user.dob.toString()) });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "error finding user" });
  }
}
