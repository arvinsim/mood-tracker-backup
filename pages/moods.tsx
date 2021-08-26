import { GetServerSideProps } from "next";
import Image from "next/image";
import prisma from "../lib/prisma";
import HappySmiley from "../components/MoodButtons/happy-smiley.svg";

import type { Mood } from "@prisma/client";
import type { NextPage } from "next";
import { MoodButtons } from "../components/MoodButtons";

const MoodsPage: NextPage<{ moods: Mood[] }> = ({ moods }) => {
  return (
    <div className="grid justify-items-center">
      <h1>How are you feeling today?</h1>
      <MoodButtons moods={moods} />
      <footer>
        <div>
          Icons made by{" "}
          <a href="https://www.freepik.com" title="Freepik">
            Freepik
          </a>{" "}
          from{" "}
          <a href="https://www.flaticon.com/" title="Flaticon">
            www.flaticon.com
          </a>
        </div>
      </footer>
    </div>
  );
};

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
