import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export default function auth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const id = jwt.verify(token as string, process.env.JWT_SECRET) as string;
    if (!id) throw Error("NO ID");

    req.userId = id;
    next();
    return;
  } catch (err) {
    console.log(err);
    return res.status(401).send("");
  }
}
