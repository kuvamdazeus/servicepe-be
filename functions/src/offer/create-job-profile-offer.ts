import { Request, Response } from "express";
import getClient from "../prisma-client";

// CLIENT makes an offer TO -> WORKER's job profile
export default async function createJobProfileOffer(req: Request, res: Response) {
  
  // NOTE: req.body should contain { job_profile_id, metadata: { ...jobProfile_fields } }

  try {
    const client = await getClient();
    await client.jobProfileOffer.create({
      data: { user_id: req.userId, ...req.body },
    });

    return res.status(200).json({ message: "created job profile offer" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "error creating job profile offer, bad request" });
  }
}
