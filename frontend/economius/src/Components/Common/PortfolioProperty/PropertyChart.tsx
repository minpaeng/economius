import React from "react";
// import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";

function PropertyChart({ money, gold, buildings, savings, stocks }) {
  return (
    <div id="chart">
      <ReactApexChart
        type="donut"
        series={[money, stocks, gold, buildings, savings]}
        options={{
          labels: ["현금", "주식", "금", "부동산", "적금"],
          dataLabels: {
            enabled: false,
          },
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  show: false,
                },
              },
            },
          ],
          legend: {
            position: "right",
            offsetY: 0,
            height: 230,
          },
          tooltip: {
            style: {
              fontSize: "15px",
            },
          },
        }}
        style={{ width: "300px" }}
      />
    </div>
  );
}

export default PropertyChart;
