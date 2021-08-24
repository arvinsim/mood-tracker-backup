import { GetServerSideProps } from "next";
import prisma from "../lib/prisma";

import type { Mood } from "@prisma/client";
import type { NextPage } from "next";

const MoodsPage: NextPage<{ moods: Mood[] }> = ({ moods }) => {
  return (
    <div>
      <h1>How are you feeling today?</h1>
      <div>
        {moods.map((mood) => {
          return (
            <div
              onClick={async () => await createMoodLog({ mood })}
              key={mood.id}
            >
              {mood.name}
            </div>
          );
        })}
      </div>
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

export const createMoodLog = async ({ mood }: { mood: Mood }) => {
  try {
    const data = {
      mood: {
        id: mood.id,
      },
    };
    const response = await fetch("/api/moodLogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    console.log(result);
  } catch (e) {
    console.error(e);
  }
};

export default MoodsPage;
