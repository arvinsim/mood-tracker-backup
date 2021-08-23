import { GetServerSideProps } from "next";
import prisma from "../lib/prisma";

function MoodsPage({ moods }) {
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
  const moods = await prisma.mood.findMany();
  return {
    props: { moods },
  };
};

export default MoodsPage;
