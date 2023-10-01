import ReactApexChart from "react-apexcharts";

function RealEstateChart({ data }) {
  console.log(data);
  return (
    <div>
      <ReactApexChart
        type="line"
        series={[
          {
            name: "레스토랑",
            data: data[0],
          },
          {
            name: "가게",
            data: data[1],
          },
          {
            name: "호텔",
            data: data[2],
          },
        ]}
        options={{
          //   theme: {
          //     mode: "dark",
          //   },
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
            width: [5, 7, 5],
            curve: "straight",
            dashArray: [0, 8, 5],
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
            type: "category",
            // categories: data?.map((price) => price.turn),
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

export default RealEstateChart;

// const options = {
//     series: [{
//       name: "Session Duration",
//       data: [45, 52, 38, 24, 33, 26, 21, 20, 6, 8, 15, 10]
//     },
//     {
//       name: "Page Views",
//       data: [35, 41, 62, 42, 13, 18, 29, 37, 36, 51, 32, 35]
//     },
//     {
//       name: 'Total Visits',
//       data: [87, 57, 74, 99, 75, 38, 62, 47, 82, 56, 45, 47]
//     }
//   ],
//     chart: {
//     height: 350,
//     type: 'line',
//     zoom: {
//       enabled: false
//     },
//   },
//   dataLabels: {
//     enabled: false
//   },
//   stroke: {
//     width: [5, 7, 5],
//     curve: 'straight',
//     dashArray: [0, 8, 5]
//   },
//   title: {
//     text: 'Page Statistics',
//     align: 'left'
//   },
//   legend: {
//     tooltipHoverFormatter: function(val, opts) {
//       return val + ' - ' + opts.w.globals.series[opts.seriesIndex][opts.dataPointIndex] + ''
//     }
//   },
//   markers: {
//     size: 0,
//     hover: {
//       sizeOffset: 6
//     }
//   },
//   xaxis: {
//     categories: ['01 Jan', '02 Jan', '03 Jan', '04 Jan', '05 Jan', '06 Jan', '07 Jan', '08 Jan', '09 Jan',
//       '10 Jan', '11 Jan', '12 Jan'
//     ],
//   },
//   tooltip: {
//     y: [
//       {
//         title: {
//           formatter: function (val) {
//             return val + " (mins)"
//           }
//         }
//       },
//       {
//         title: {
//           formatter: function (val) {
//             return val + " per session"
//           }
//         }
//       },
//       {
//         title: {
//           formatter: function (val) {
//             return val;
//           }
//         }
//       }
//     ]
//   },
//   grid: {
//     borderColor: '#f1f1f1',
//   }
//   }
