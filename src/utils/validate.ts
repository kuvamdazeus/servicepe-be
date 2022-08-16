import { Request } from "express";
import jwt from "jsonwebtoken";

export const isValidRequest = (req: Request) => {
  let userId: string | null;

  try {
    const token = req.headers.authorization?.split(" ")[1];
    userId = jwt.verify(token as string, process.env.JWT_SECRET as string) as string;
  } catch (err) {
    console.log(err);
    userId = null;
  }

  return userId;
};
