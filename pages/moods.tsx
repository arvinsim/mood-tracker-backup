import { GetServerSideProps } from "next";
import prisma from "../lib/prisma";

type Data = {
  id: number;
  name: string;
};

function Moods({ moods }) {
  return (
    <div>
      <h1>Moods</h1>
      <ul>
        {moods.map((mood) => {
          return <li>{mood.name}</li>;
        })}
      </ul>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async () => {
  const moods: Data[] = await prisma.mood.findMany();
  return {
    props: { moods },
  };
};

export default Moods;
