"use client";
import { useEffect, useState } from "react";
import axios from "axios";

const BarChart = ({className}) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    // Fetch the dummy chart data from the API
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://quickchart.io/chart?chart={ 
             type: 'bar',
             data: {
               labels: ['Jan', 'Feb', 'March', 'April','May','June','July','Aug','Sep','Oct','Nov','Dec'],
               datasets: [{
                 label: 'register',
                 data: [49, 30, 60, 55, 70, 39, 58 , 20, 42, 90, 80, 50],
                 backgroundColor: 'rgb(59, 130, 246)'
               }]
              }
            }&backgroundColor=white&width=600&height=350&devicePixelRatio=1.0&format=png&version=2.9.3`);

        setChartData(response.config.url);
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div >
      {chartData && <img className={className} src={chartData} alt="Bar Chart" />}
    </div>
  );
};

export default BarChart;
