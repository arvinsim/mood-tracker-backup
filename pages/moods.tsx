import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import prisma from "../lib/prisma";

import type { Mood } from "@prisma/client";
import { MoodButtons } from "../components/MoodButtons";
import { Footer } from "../components/Footer";

const MoodsPage: NextPage<{ moods: Mood[] }> = ({ moods }) => {
  return (
    <div className="w-full">
      <main
        role="main"
        className="w-full flex flex-col h-screen content-center justify-center"
      >
        <div className="w-full sm:w-1/2 lg:w-1/3 bg-gray-50 rounded-xl m-auto">
          <div className="bg-white rounded shadow px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h1 className="w-full text-center p-7 text-3xl font-bold">
              How are you feeling today?
            </h1>
            <MoodButtons moods={moods} />
          </div>
        </div>
        <Footer />
      </main>
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
