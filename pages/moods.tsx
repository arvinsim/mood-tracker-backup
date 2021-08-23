import { Prisma } from "@prisma/client";
import { GetServerSideProps } from "next";
import prisma from "../lib/prisma";

type TMoods = Prisma.PromiseReturnType<typeof getMoods>;
type TMoodLogs = Prisma.PromiseReturnType<typeof getMoodLogs>;

function MoodsPage({
  moods,
  moodLogs,
}: {
  moods: TMoods;
  moodLogs: TMoodLogs;
}) {
  return (
    <div>
      <h1>Moods</h1>
      <ul>
        {moods.map((mood) => {
          return <li key={mood.id}>{mood.name}</li>;
        })}
      </ul>
      <ul>
        {moodLogs.map((moodLog) => {
          return <li key={moodLog.id}>{moodLog.createdAt}</li>;
        })}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const moods = await getMoods();
  const moodLogs = await getMoodLogs();
  return {
    props: { moods, moodLogs },
  };
};

export const getMoods = async () => {
  return await prisma.mood.findMany();
};

export const getMoodLogs = async () => {
  return await prisma.moodLog.findMany();
};

export default MoodsPage;
