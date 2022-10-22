import { Request, Response } from "express";
import getClient from "../prisma-client";

export default async function createVerification(req: Request, res: Response) {
  const { phone } = req.body;
  const otp = parseInt(Math.random().toString().slice(2, 6)); // make this string

  // send otp here
  console.log(otp);

  const client = await getClient();
  await client.verification.create({
    data: { otp, phone },
  });

  return res.status(200).json({ messgae: "otp sent" });
}
