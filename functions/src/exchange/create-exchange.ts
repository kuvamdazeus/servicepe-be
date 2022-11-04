import { Request, Response } from "express";
import getClient from "../prisma-client";

export default async function createExchange(req: Request, res: Response) {
  const client = await getClient();
  await client.exchangeRequest.create({
    data: {
      ...req.body,
    },
  });

  return res.status(200).json({ message: "exchange created successfully" });
}
