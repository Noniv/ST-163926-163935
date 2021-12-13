import React from "react";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { Bar } from "react-chartjs-2";
import { Count } from "../types";
import styles from "../styles/Result.module.css";

export type ChartProps = {
  count: Count[];
  image?: string;
  title: string;
  url: string;
};

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);


const Result = ({ count, image, title, url }: ChartProps) => {
  const options = {
    indexAxis: "y",
    maintainAspectRatio: false,
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
  };

  const labels = count.map((element) => element.value).slice(0, 100);
  
  const data = {
    datasets: [
      {
        axis: "y",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        color: '#36A2EB',
        barPercentage: 1.0,
        categoryPercentage: 1.0,
        data: count.map((element) => element.count).slice(0, 100),
        label: "Ilość wystąpień",
      },
    ],
    labels,
  };

  return (
    <>
      <h2 className={styles.h2}>Wyniki dla strony {url}:</h2>
      {image && <div className={styles.image} style={{ backgroundImage: `url(${image})` }}></div>}
      <div className={styles.div}>
        <Bar options={options as any} data={data} />
      </div>
    </>
  );
};

export default Result;
