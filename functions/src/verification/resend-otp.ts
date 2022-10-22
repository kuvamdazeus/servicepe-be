import { Request, Response } from "express";
import getClient from "../prisma-client";

export default async function resendOTP(req: Request, res: Response) {
  const { phone } = req.body;

  const client = await getClient();
  const verificationData = await client.verification.findUniqueOrThrow({
    where: { phone },
    select: { otp: true },
  });

  // send otp
  console.log(verificationData.otp);

  return res.status(200).json({ message: "otp resent" });
}
