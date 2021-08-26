import React from "react";
import Image from "next/image";
import HappySmileyIcon from "./happy-smiley.svg";
import SadSmileyIcon from "./sad-smiley.svg";
import type { Mood } from "@prisma/client";

export function MoodButtons({ moods }: { moods: Mood[] }) {
  return (
    <div className="flex flex-row flex-auto">
      {moods.map((mood) => {
        return (
          <div
            onClick={async () => await createMoodLog({ mood })}
            key={mood.id}
          >
            <Image
              src={mood.id === 1 ? HappySmileyIcon : SadSmileyIcon}
              alt={mood.id === 1 ? "Happy Smiley" : "Sad Smiley"}
              width={100}
              height={100}
            />
          </div>
        );
      })}
    </div>
  );
}

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
