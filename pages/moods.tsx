import React from "react";
import useSWR from "swr";
import { MoodButtons } from "../components/MoodButtons";
import { Footer } from "../components/Footer";
import type { Moods } from "./api/moods";
import { Loader } from "../components/Loader";

function MoodsPage() {
  const [isMoodChosen, setIsMoodChosen] = React.useState(false);
  const fetcher = async (...args) => {
    try {
      const result = await fetch(...args);
      return result.json();
    } catch (e) {
      console.log("error fetching data");
    }
  };
  const { data, error } = useSWR<{ moodLogs: Array<Moods> }>(
    "/api/moods",
    fetcher
  );
  if (error) return <div>Failed to load</div>;
  if (!data) {
    return (
      <div className="w-full flex flex-col h-screen content-center justify-center">
        <Loader />
      </div>
    );
  }

  return (
    <div className="w-full">
      <main
        role="main"
        className="w-full flex flex-col h-screen content-center justify-center"
      >
        <div className="w-full sm:w-1/2 lg:w-1/3 bg-gray-50 rounded-xl m-auto">
          <div className="bg-gray-300 rounded shadow px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <h1 className="w-full text-center p-7 text-3xl font-bold">
              {isMoodChosen ? (
                <span>Thank you for logging your mood!</span>
              ) : (
                <span>How are you feeling today?</span>
              )}
            </h1>
            {!isMoodChosen && (
              <MoodButtons
                moods={data?.moods}
                setIsMoodChosen={setIsMoodChosen}
              />
            )}
          </div>
        </div>
        <Footer />
      </main>
    </div>
  );
}

export default MoodsPage;
