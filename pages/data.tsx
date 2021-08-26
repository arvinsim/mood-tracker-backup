import { GetServerSideProps, InferGetServerSidePropsType } from "next";
import dayjs from "dayjs";
import prisma from "../lib/prisma";

import type { MoodLog } from "@prisma/client";

function DataPage({
  moodLogs,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <div>
      <h1>These is how you have been feeling this week!</h1>
      <div>
        {moodLogs.map((moodLog) => {
          return (
            <div key={moodLog.id}>
              {moodLog.moodId} - {moodLog.createdAt.getTime()}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps<{ moodLogs: MoodLog[] }> =
  async () => {
    const moodLogs = await getMoodLogs();
    return {
      props: { moodLogs },
    };
  };

export const getMoodLogs = async () => {
  return await prisma.moodLog.findMany({
    where: {
      createdAt: {
        lte: dayjs().day(0).toDate(),
        gte: dayjs().day(6).toDate(),
      },
    },
  });
};

export default DataPage;
