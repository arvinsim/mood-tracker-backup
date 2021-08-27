import { Prisma } from "@prisma/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
// import dayjs from "dayjs";
import prisma from "../lib/prisma";

function DataPage({
  moodLogs,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  let pieChartData: { [key: number]: { moodName: string; count: number } } = {};
  moodLogs.forEach((moodLog) => {
    if (moodLog.moodId in pieChartData) {
      pieChartData[moodLog.moodId].count++;
    } else {
      pieChartData[moodLog.moodId] = { moodName: moodLog.mood.name, count: 1 };
    }
  });
  console.log(moodLogs);
  console.log(pieChartData);
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

export const getServerSideProps: GetServerSideProps<{
  moodLogs: Prisma.PromiseReturnType<typeof getMoodLogs>;
}> = async () => {
  const moodLogs = await getMoodLogs();
  return {
    props: { moodLogs },
  };
};

export const getMoodLogs = async () => {
  return await prisma.moodLog.findMany({
    include: {
      mood: {
        select: {
          name: true,
        },
      },
    },
    // where: {
    //   createdAt: {
    //     lte: dayjs().day(0).toDate(),
    //     gte: dayjs().day(6).toDate(),
    //   },
    // },
  });
};

export default DataPage;
