import { Prisma } from "@prisma/client";
import { GetServerSideProps } from "next";
import prisma from "../lib/prisma";

type TMoods = Prisma.PromiseReturnType<typeof getMoods>;

function MoodsPage({ moods }: { moods: TMoods }) {
  return (
    <div>
      <h1>Moods</h1>
      <ul>
        {moods.map((mood) => {
          return <li key={mood.id}>{mood.name}</li>;
        })}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const moods = await getMoods();
  return {
    props: { moods },
  };
};

export const getMoods = async () => {
  return await prisma.mood.findMany();
};

export default MoodsPage;
