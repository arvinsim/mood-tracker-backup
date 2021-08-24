import { Prisma } from "@prisma/client";
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

export const createMoodLog = async (props: { mood: Mood }) => {
  try {
    const response = await fetch("/api/moodLogs", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    });
    console.log(response);
  } catch (e) {
    console.error(e);
  }

  // const { mood } = props;
  // const data: Prisma.MoodLogCreateInput = {
  //   mood: {
  //     connect: {
  //       id: mood.id,
  //     },
  //   },
  //   createdAt: new Date(),
  // };
  // try {
  // await prisma.moodLog.create({ data });
  // } catch (e) {
  //   console.log(e);
  //   debugger;
  //   if (e instanceof Prisma.PrismaClientKnownRequestError) {
  //     // The .code property can be accessed in a type-safe manner
  //     if (e.code === "P2002") {
  //       console.log(
  //         "There is a unique constraint violation, a new user cannot be created with this email"
  //       );
  //     }
  //   }
  //   throw e;
  // }
};

export default MoodsPage;
