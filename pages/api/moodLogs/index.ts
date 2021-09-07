import type { MoodLog } from "@prisma/client";
import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

type Data = {
  moodLog?: MoodLog;
  moodLogs?: Array<MoodLog>;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "POST") {
    const { mood } = req.body;
    const data: Prisma.MoodLogCreateInput = {
      mood: {
        connect: {
          id: mood.id,
        },
      },
      createdAt: new Date(),
    };
    try {
      const moodLog = await prisma.moodLog.create({ data });
      res.status(200).json({ moodLog });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        // The .code property can be accessed in a type-safe manner
        if (e.code === "P2002") {
          console.log(
            "There is a unique constraint violation, a new user cannot be created with this email"
          );
        }
      }
      throw e;
    }
  } else if (req.method === "GET") {
    const moodLogs = await getMoodLogsWithMood();
    res.status(200).json({ moodLogs: moodLogs });
  }
}

async function getMoodLogsWithMood() {
  return await prisma.moodLog.findMany({
    include: {
      mood: true,
    },
    // include: {
    //   mood: {
    //     select: {
    //       id: true,
    //       name: true,
    //     },
    //   },
    // },
    // where: {
    //   createdAt: {
    //     lte: dayjs().day(0).toDate(),
    //     gte: dayjs().day(6).toDate(),
    //   },
    // },
  });
}

export type MoodLogsWithMood = Prisma.PromiseReturnType<
  typeof getMoodLogsWithMood
>;
