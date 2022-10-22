import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import getClient from "../prisma-client";

export async function createUser(req: Request, res: Response) {
  const { name, dob, location, image, phone } = req.body;

  const client = await getClient();
  const newUser = await client.user.create({
    data: {
      name,
      dob,
      image,
      location,
      phone,
    },
  });

  const token = jwt.sign(newUser.id, process.env.JWT_SECRET);
  return res.status(200).json({ token, user: { ...newUser, dob: parseInt(newUser.dob.toString()) } });
}
