"use client";
import { useEffect, useState } from "react";
import { fetchTasksData } from "@/utils/barchart";

import * as tfvis from "@tensorflow/tfjs-vis";

const TaskChart = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const taskData = await fetchTasksData();
      setData(taskData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    if (data.length > 0) {
      plotOutputLableCount(data);
    }
  }, [data]);

  const plotOutputLableCount = (labels) => {
    const newLabels = labels.reduce((acc, cur) => {
      acc[cur] = (acc[cur] || 0) + 1;
      return acc;
    }, {});

    const barChartData = [];
    Object.keys(newLabels).forEach((key) => {
      barChartData.push({
        index: key,
        value: newLabels[key],
      });
    });

    tfvis.render.barchart(
      {
        tab: "Task Chart",
        name: "Task Chart Using TensorFlow.js tfvis",
      },
      barChartData
    );
  };

  return <div>TaskChart</div>;
};

export default TaskChart;
