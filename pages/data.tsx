import { PieChart, Pie, Tooltip } from "recharts";
import useSWR from "swr";
import { MoodLogsWithMood } from "./api/moodLogs";

function DataPage() {
  const fetcher = async (...args) => {
    try {
      const result = await fetch(...args);
      return result.json();
    } catch (e) {
      console.log("error fetching data");
    }
  };
  const { data, error } = useSWR<{ moodLogs: Array<MoodLogsWithMood> }>(
    "/api/moodLogs",
    fetcher
  );

  if (error) return <div>Failed to load</div>;
  if (!data) {
    return <div>Loading...</div>;
  }

  let pieChartData: { [key: number]: { moodName: string; count: number } } = {};
  data?.moodLogs.forEach((moodLog) => {
    const moodId = moodLog?.moodId;
    if (moodId in pieChartData) {
      pieChartData[moodId].count++;
    } else {
      pieChartData[moodId] = {
        moodName: moodLog.mood.name,
        count: 1,
      };
    }
  });
  const chartData = Object.entries(pieChartData).map(([key, item]) => {
    return { id: key, moodName: item.moodName, count: item.count };
  });
  console.log(chartData);

  return (
    <div className="w-full h-screen">
      <h1>These is how you have been feeling this week!</h1>
      <PieChart width={1000} height={400}>
        <Pie
          nameKey="moodName"
          dataKey="count"
          isAnimationActive={false}
          data={chartData}
          cx={200}
          cy={200}
          outerRadius={80}
          fill="#8884d8"
          label
        />
        <Tooltip />
      </PieChart>
    </div>
  );
}

export default DataPage;
