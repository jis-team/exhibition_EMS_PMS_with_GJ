import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { useState, useEffect } from "react";

function MoterTempChart(props) {
  const [alertvalue, setAlertvalue] = useState(0);

  const MoterTempC = 30;

  const MoterTempOption = {
    chart: {
      type: "spline",
      backgroundColor: false,
      zoomType: "x",
      height: 147,
    },
    title: {
      useHTML: true,
      floating: true,
      text: "모터 권선온도",
      style: {
        color: "transparent",
      },
    },
    credits: {
      enabled: false,
    },
    legend: {
      useHTML: true,
      align: "right",
      verticalAlign: "top",
      borderWidth: 0,
      x: -30,
      y: 0,
      itemStyle: {
        fontFamily: "EliceDigitalBaeum",
        textShadow: "0 0 9px #5cafff",
        fontSize: "13px",
      },
      labelFormatter: function () {
        return `<span style="color: #fff; width: 100px;">  ${this.name} </span>`;
      },
    },
    tooltip: {
      valueDecimals: 3,
      xDateFormat: "%Y-%m-%d %H:%M:%S",
      useHTML: true,
    },
    xAxis: {
      title: {
        text: "",
      },
      type: "datetime",
      labels: {
        format: "{value:%m-%d}",
        style: {
          fontFamily: "Barlow",
          fontSize: 12,
          color: "rgba(211, 231, 255, 0.7)",
        },
      },
      lineColor: "rgba(157, 191, 255, 0.5)",
      tickInterval: 1000 * 60 * 60 * 24, // 24시간
    },
    yAxis: {
      title: {
        align: "middle",
        text: "인자",
        useHTML: true,
        offset: 35,
        rotation: 90,
        x: 0,
        y: -5,
        style: {
          fontFamily: "Barlow",
          fontSize: "6px",
          fontWeight: "bold",
          color: "#d3e7ff",
        },
      },
      lineColor: "rgba(157, 191, 255, 0.5)",
      lineWidth: 1,
      max: 30,
      min: 0,
      gridLineColor: false,
      labels: {
        style: {
          fontFamily: "Barlow",
          fontSize: 13,
          color: "#d3e7ff",
        },
      },
      plotLines: [
        {
          color: "#ff0000",
          dashStyle: "shortDash",
          value: MoterTempC,
          width: 1,
          label: {
            text: "결함",
            color: "#ff0000",
            textAlign: "left",
            x: 330,
            style: {
              color: "#ff0000",
              fontSize: 6,
            },
          },
        },
      ],
    },
    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        marker: {
          enabled: false,
        },
      },
    },
    series: [],
    exporting: false,
  };

  const [MoterTempOptions, setMoterTempOption] = useState(MoterTempOption);

  useEffect(() => {
    setMoterTempOption((prevOptions) => {
      let make_err;
      if (Number(props.pumpnum) === 12) {
        make_err = 20;
      } else {
        make_err = 18;
      }
      const dataArray = Array(24 * 7).fill(make_err);
      // const dataArray = Array(24 * 7).fill(Number(props.pumpnum) + 12);
      const dataVibOne = dataArray
        .map((value, i) => {
          return [
            Date.UTC(
              Number(new Date().getFullYear()),
              Number(new Date().getMonth()),
              Number(new Date().getDate()),
              Number(new Date().getHours()),
              0
            ) -
              i * 1000 * 60 * 60,
            parseFloat((value + value * 0.1 + Math.random() * 2).toFixed(3)) +
              (i % 20 === 0 ? 4 : 0),
          ];
        })
        .sort((a, b) => a[0] - b[0]);

      const dataVibTwo = dataArray
        .map((value, i) => {
          return [
            Date.UTC(
              Number(new Date().getFullYear()),
              Number(new Date().getMonth()),
              Number(new Date().getDate()),
              Number(new Date().getHours()),
              0
            ) -
              i * 1000 * 60 * 60,
            parseFloat(
              (value + 2 + value * 0.1 + Math.random() * 2).toFixed(3)
            ) + (i % 20 === 0 ? 4 : 0),
          ];
        })
        .sort((a, b) => a[0] - b[0]);
      const dataVibThree = dataArray
        .map((value, i) => {
          return [
            Date.UTC(
              Number(new Date().getFullYear()),
              Number(new Date().getMonth()),
              Number(new Date().getDate()),
              Number(new Date().getHours()),
              0
            ) -
              i * 1000 * 60 * 60,
            parseFloat(
              (value + 4 + value * 0.1 + Math.random() * 2).toFixed(3)
            ) + (i % 20 === 0 ? 4 : 0),
          ];
        })
        .sort((a, b) => a[0] - b[0]);

      // 알람 팝업
      // 부하 총진동량
      const dataAlert = dataVibOne.map((value) => {
        if (MoterTempC < value[1]) {
          return 3;
        } else {
          return 0;
        }
      });
      const dataAlert2 = dataVibTwo.map((value) => {
        if (MoterTempC <= value[1]) {
          return 3;
        } else {
          return 0;
        }
      });
      const dataAlert3 = dataVibThree.map((value) => {
        if (MoterTempC <= value[1]) {
          return 3;
        } else {
          return 0;
        }
      });

      setAlertvalue(Math.max(...dataAlert, ...dataAlert2, ...dataAlert3));

      const options = {
        ...prevOptions,
        series: [
          {
            name: "R",
            data: dataVibOne,
            color: "#8098ff",
          },
          {
            name: "S",
            data: dataVibTwo,
            color: "#ffe201",
          },
          {
            name: "T",
            data: dataVibThree,
            color: "#7ed885",
          },
        ],
      };
      return options;
    });
  }, [props.pumpnum]);

  useEffect(() => {
    props.Tempalertfunction(alertvalue);
  }, [alertvalue, props]);

  return (
    <HighchartsReact highcharts={Highcharts} options={MoterTempOptions} />
    // <h2>{props.testdata}</h2>
  );
}
export default MoterTempChart;
