"use client";
import { Doughnut } from "react-chartjs-2";

export const DoughnutChart = () => {
  const data = {
    labels: [
      "2024-09-01",
      "2024-09-02",
      "2024-09-03",
      "2024-09-04",
      "2024-09-05",
      "2024-09-06",
      "2024-09-07",
    ],
    datasets: [
      {
        label: "Units Sold",
        data: [100, 120, 110, 115, 130, 140, 150],
        backgroundColor: [
          "rgba(255, 99, 132, 0.6)",
          "rgba(54, 162, 235, 0.6)",
          "rgba(255, 206, 86, 0.6)",
          "rgba(75, 192, 192, 0.6)",
          "rgba(153, 102, 255, 0.6)",
          "rgba(255, 159, 64, 0.6)",
        ],
      },
    ],
  };

  return <Doughnut data={data} />;
};
