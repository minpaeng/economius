import React from "react";
import ReactApexChart from "react-apexcharts";

function SideStockOwnerChart({ remainingAmount, owners }) {
  const colors = [
    "#FFD885B2",
    "#83D5E9B2",
    "#FF9C9FB2",
    "#FFA684B2",
    "rgb(100,100,100)",
  ];
  return (
    <div style={{ margin: "16px" }}>
      <ReactApexChart
        options={{
          chart: {
            width: 380,
            type: "pie",
          },
          labels: ["User1", "User2", "User3", "User4", "구매 가능 주식"],
          responsive: [
            {
              breakpoint: 480,
              options: {
                chart: {
                  width: 200,
                },
                legend: {
                  position: "bottom",
                },
              },
            },
          ],
          colors: colors,
        }}
        series={[
          owners[0][1],
          owners[0][2],
          owners[0][3],
          owners[0][4],

          remainingAmount,
        ]}
        type="pie"
        width={330}
      />
    </div>
  );
}

export default SideStockOwnerChart;
