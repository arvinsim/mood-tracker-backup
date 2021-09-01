import { Prisma } from "@prisma/client";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";
// import dayjs from "dayjs";
import prisma from "../lib/prisma";
import { PieChart, Pie, Tooltip } from "recharts";

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
  const data = Object.entries(pieChartData).map(([key, item]) => {
    return { id: key, moodName: item.moodName, count: item.count };
  });
  console.log(data);

  return (
    <div className="w-full h-screen">
      <h1>These is how you have been feeling this week!</h1>
      {/*<div>*/}
      {/*  {moodLogs.map((moodLog) => {*/}
      {/*    return (*/}
      {/*      <div key={moodLog.id}>*/}
      {/*        {moodLog.moodId} - {moodLog.createdAt.getTime()}*/}
      {/*      </div>*/}
      {/*    );*/}
      {/*  })}*/}
      {/*</div>*/}
      <PieChart width={1000} height={400}>
        <Pie
          nameKey="moodName"
          dataKey="count"
          isAnimationActive={false}
          data={data}
          cx={200}
          cy={200}
          outerRadius={80}
          fill="#8884d8"
          label
        />
        <Tooltip />
      </PieChart>
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
