import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import getClient from "../prisma-client";

// currently not checking created_at field
export default async function verifyUser(req: Request, res: Response) {
  const { phone, otp } = req.body;

  const client = await getClient();
  const verificationData = await client.verification.findUnique({
    where: {
      phone,
    },
    select: {
      otp: true,
    },
  });

  if (!verificationData) return res.status(400).json({ message: "bad request" });
  if (verificationData.otp !== otp) return res.status(401).json({ message: "wrong otp entered" });

  const [, userData] = await Promise.all([
    client.verification.delete({
      where: { phone },
    }),
    client.user.findUnique({ where: { phone }, select: { id: true } }),
  ]);

  return res
    .status(200)
    .json({
      message: "otp verified",
      exists: !!userData,
      token: userData ? jwt.sign(userData.id, process.env.JWT_SECRET) : null,
    });
}
