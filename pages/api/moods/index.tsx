import type { MoodLog } from "@prisma/client";
import { Prisma } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "../../../lib/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method === "GET") {
    const moods = await getMoods();
    res.status(200).json({ moods });
  }
}

async function getMoods() {
  return await prisma.mood.findMany();
}

type Data = {
  moodLog: MoodLog;
};
export type Moods = Prisma.PromiseReturnType<typeof getMoods>;
