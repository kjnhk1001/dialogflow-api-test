"use client";
import { PolarArea } from "react-chartjs-2";

export const PolarAreaChart = () => {
  const data = {
    labels: ["Red", "Green", "Yellow", "Grey", "Blue"],
    datasets: [
      {
        label: "My Dataset",
        data: [11, 16, 7, 3, 14],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(255, 205, 86, 0.6)",
          "rgba(201, 203, 207, 0.6)",
          "rgba(54, 162, 235, 0.6)",
        ],
      },
    ],
  };

  return <PolarArea data={data} />;
};
