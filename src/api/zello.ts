import { Request, Response } from "express";

export default function handler(_: Request, res: Response) {
  res.status(200).json({ message: "Hi 👋🏻" });
}
