import { Request, Response } from "express";
import { getFirestore } from "firebase-admin/firestore";
import getClient from "../prisma-client";
import { generateHash } from "../utils";
import { getFirebaseApp } from "../firebase";
import { FirebaseMessage } from "../interfaces";
import { JobOffer } from "@prisma/client";

const firestore = getFirestore(getFirebaseApp());

// WORKER makes an offer TO -> CLIENT's job request
// NOTE: req.body here should BE { data: {job_profile_id, job_id}, message: string, recipient: <id> }
export default async function createJobOffer(req: Request, res: Response) {
  try {
    const client = await getClient();
    const room = generateHash();

    const [sender, reciever, jobOfferData] = await Promise.all([
      client.user.findUniqueOrThrow({
        where: { id: req.userId },
      }),

      client.user.findUniqueOrThrow({
        where: { id: req.body.recipient },
      }),

      client.jobOffer.create({
        data: req.body.data,

        // include the job offer data along with user's details
        select: {
          id: true,
          job_id: true,
          job_profile_id: true,
          accepted: true,

          job: true,
          jobProfile: true,
        },
      }),
    ]);

    await Promise.all([
      firestore.collection(`rooms/${room}/chats`).add({
        sender,
        reciever,
        message: req.body.message,
        metadata: { type: "jobOffer", data: jobOfferData },
        created_at: Date.now(),
      } as FirebaseMessage),

      firestore.collection(sender.id).add({
        roomId: room,
        sender,
        reciever,
      }),

      firestore.collection(reciever.id).add({
        roomId: room,
        sender,
        reciever,
      }),
    ]);

    return res.status(200).json({ message: "created job offer" });
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "error creating job offer, bad request" });
  }
}
