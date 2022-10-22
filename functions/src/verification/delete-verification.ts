import { Request, Response } from "express";
import getClient from "../prisma-client";

export default async function deleteVerification(req: Request, res: Response) {
  const { phone } = req.query as any;

  const client = await getClient();
  await client.verification.delete({ where: { phone } });

  return res.status(200).json({ message: "deleted verification" });
}
