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
            animations: {
              enabled: true, // 애니메이션 활성화
              easing: "linear", // 애니메이션 이징 설정 (linear, easeOutSine 등)
              speed: 1000, // 애니메이션 속도 (1초에 그래프가 그려짐)
              animateGradually: {
                enabled: true,
                delay: 150, // 연속적인 포인트 간의 애니메이션 간격
              },
              dynamicAnimation: {
                enabled: true, // 다이나믹 애니메이션 활성화
                speed: 350, // 다이나믹 애니메이션 속도
              },
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
