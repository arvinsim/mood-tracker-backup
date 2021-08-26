import { GetServerSideProps, InferGetServerSidePropsType } from "next";
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
  return await prisma.moodLog.findMany();
};

export default DataPage;
