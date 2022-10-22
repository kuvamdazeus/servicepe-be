// import { Request, Response } from "express";
// import getClient from "../prisma-client";

// export default async function getRooms(req: Request, res: Response) {
//   try {
//     const client = await getClient();

//     const data = await client.chatRoom.findMany({
//       where: {
//         user_id: req.userId,
//       },
//       select: {
//         room: true,
//       },
//     });

//     const rooms = data.map((row) => row.room);

//     return res.status(200).json(rooms);
//   } catch (err) {
//     console.log(err);
//     return res.status(200).json({ message: "unexpected error occured!" });
//   }
// }
