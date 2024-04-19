import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const ChartComponent = () => {
  const chartContainer = useRef(null);
  const chartInstance = useRef(null);

  const data = {
    labels: ["Users", "Teams", "Requests"],
    datasets: [
      {
        data: [30, 20, 50],
        backgroundColor: ["#4F46E5", "#34D399", "#FBBF24"],
        borderWidth: 0,
      },
    ],
  };

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      chartInstance.current = new Chart(chartContainer.current, {
        type: "doughnut",
        data: data,
        options: {
          maintainAspectRatio: false,
          plugins: {
            legend: {
              position: "bottom",
            },
          },
        },
      });
    }

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  return (
    <div className="flex justify-center items-center bg-white rounded-lg h-96 ">
      <div className="w-2/4">
        <div className="w-full h-full">
          <canvas ref={chartContainer} className="w-full h-full" />
        </div>
      </div>
    </div>
  );
};

export default ChartComponent;
