"use client";
import { Radar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from "chart.js";

// 必要なコンポーネントを登録
ChartJS.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
);

export const RadarChart = () => {
  const data = {
    labels: [
      "Sales",
      "Marketing",
      "Development",
      "Customer Support",
      "IT",
      "Administration",
    ],
    datasets: [
      {
        label: "2024 Q1",
        data: [65, 59, 90, 81, 56, 55],
        backgroundColor: "rgba(179, 181, 198, 0.2)",
        borderColor: "rgba(179, 181, 198, 1)",
        pointBackgroundColor: "rgba(179, 181, 198, 1)",
      },
      {
        label: "2024 Q2",
        data: [28, 48, 40, 19, 96, 27],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        pointBackgroundColor: "rgba(255, 99, 132, 1)",
      },
    ],
  };

  return <Radar data={data} />;
};
