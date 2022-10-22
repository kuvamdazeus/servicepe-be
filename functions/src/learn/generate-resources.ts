import axios from "axios";
import { Request, Response } from "express";
import * as firebase from "firebase-admin";
import { CATEGORIES } from "../constants";

export const getSearchUrl = (query: string) =>
  `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&order=rating&type=video&q=${query}&key=${process.env.G_API_KEY}`;

export default async function generateResources(req: Request, res: Response) {
  const db = firebase.firestore();
  const batch = db.batch();

  await Promise.all(
    Object.values(CATEGORIES).map(async (category, index) => {
      const res = await axios.get(getSearchUrl(`${category} courses`));

      const resource: { [key: string]: any } = {};
      // resource.id = Object.keys(CATEGORIES)[index];
      resource.items = res.data.items.map((item: any) => ({ id: item.id.videoId, ...item.snippet }));
      console.log(res.data.items);

      const doc = db.collection("learn").doc(Object.keys(CATEGORIES)[index]);
      batch.set(doc, resource);
    })
  );

  batch.commit();

  return res.status(200).json({ message: "added learn resources to firestore database" });
}
