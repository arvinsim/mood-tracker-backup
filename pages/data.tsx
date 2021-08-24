import { GetServerSideProps } from "next";
import prisma from "../lib/prisma";

import type { MoodLog } from "@prisma/client";
import type { NextPage } from "next";

const DataPage: NextPage<{ moodLogs: MoodLog[] }> = ({ moodLogs }) => {
  return (
    <div>
      <h1>These is how you have been feeling this week!</h1>
      <div>
        {moodLogs.map((moodLog) => {
          return <div key={moodLog.id}>{moodLog.moodId}</div>;
        })}
      </div>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async () => {
  const moodLogs = await getMoodLogs();
  return {
    props: { moodLogs },
  };
};

export const getMoodLogs = async () => {
  return await prisma.moodLog.findMany();
};

export default DataPage;
