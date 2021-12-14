import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import type { Palette } from "@vibrant/color";
import { Count } from "../types";
import styles from "../styles/Result.module.css";

export type ChartProps = {
  count: Count[];
  image?: string;
  palette?: Palette;
  title: string;
  url: string;
};

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Result = ({ count, image, palette, title, url }: ChartProps) => {
  const options = {
    indexAxis: "y",
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: title,
        color: "rgb(235, 235, 235)",
        font: {
          size: 30,
        },
      },
    },
    scales: {
      x: {
        ticks: {
          color: "rgb(235, 235, 235)",
          font: {
            size: 14,
          },
        },
      },
      y: {
        ticks: {
          color: "rgb(235, 235, 235)",
          font: {
            size: 14,
          },
        },
      },
    },
  };

  const labels = count.map((element) => element.value).slice(0, 100);

  let color = "rgb(235, 235, 235)";

  if (palette?.LightVibrant) {
    const [r, g, b] = palette.LightVibrant.rgb;
    color = `rgb(${r}, ${g}, ${b})`;
  }

  const data = {
    datasets: [
      {
        axis: "y",
        backgroundColor: color,
        color: "#36A2EB",
        barPercentage: 1.0,
        categoryPercentage: 1.0,
        data: count.map((element) => element.count).slice(0, 100),
      },
    ],
    labels,
  };

  return (
    <>
      <h2 className={styles.h2}>Wyniki dla strony {url}:</h2>
      <div className={styles.div}>
        <Bar options={options as any} data={data} />
      </div>
    </>
  );
};

export default Result;
