import React from "react";
// import { useEffect } from "react";
import ReactApexChart from "react-apexcharts";

function PropertyChart() {
  return (
    <div id="chart">
      <ReactApexChart
        type="donut"
        series={[90, 55, 13, 33, 46]}
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
              fontSize: "15px", // 툴팁의 글꼴 크기를 조절합니다
            },
          },
        }}
        style={{ width: "300px" }}
      />
    </div>
  );
}

export default PropertyChart;
