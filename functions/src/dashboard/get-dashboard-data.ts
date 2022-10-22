import { Request, Response } from "express";
import getClient from "../prisma-client";
import { shuffle } from "../utils";

export default async function getDashboardData(req: Request, res: Response) {
  try {
    const client = await getClient();

    const filterArgs = {
      where: { NOT: { user_id: req.userId } },
      include: { user: true },
    };
    const [jobs, jobProfiles] = await Promise.all([
      client.job.findMany(filterArgs),
      client.jobProfile.findMany(filterArgs),
    ]);

    return res.status(200).json(
      shuffle([
        ...jobs.map((job) => ({
          ...job,
          type: "job",
          user: { name: (job as any).user.name, image: (job as any).user.image },
        })),
        ...jobProfiles.map((jobProfile) => ({
          ...jobProfile,
          type: "jobProfile",
          user: { name: (jobProfile as any).user.name, image: (jobProfile as any).user.image },
        })),
      ])
    );
  } catch (err) {
    console.log(err);
    return res.status(400).json({ message: "bad request" });
  }
}
