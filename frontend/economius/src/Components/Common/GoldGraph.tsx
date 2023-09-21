import React from "react";
import ReactApexChart from "react-apexcharts";

function GoldGraph({ data }) {
  return (
    <div style={{ padding: "8px 12px" }}>
      <ReactApexChart
        type="line"
        series={[
          {
            name: "Price",
            data: data?.map((price) => Number(price.price)) || [],
          },
        ]}
        options={{
          theme: {
            mode: "dark",
          },
          chart: {
            height: 500,
            width: 500,
            toolbar: {
              show: false,
            },
            background: "transparent",
          },
          stroke: {
            curve: "smooth",
            width: 4,
          },
          fill: {
            type: "gradient",
            gradient: {
              gradientToColors: ["#F2CD5C", "#F2921D", "#A61F69", "#400E32"],
              stops: [0, 100],
            },
          },

          plotOptions: {
            candlestick: {
              wick: {
                useFillColor: true,
              },
            },
          },
          xaxis: {
            type: "number",
            categories: data?.map((price) => price.turn),
            labels: {
              style: {
                colors: "#9c88ff",
              },
            },
          },
          yaxis: {
            show: false,
          },
          //   tooltip: {
          //     y: {
          //       formatter: (v) => `$ ${v.toFixed(2)}`,
          //     },
          //   },
        }}
      />
    </div>
  );
}

export default GoldGraph;
