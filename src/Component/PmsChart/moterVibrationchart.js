import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { useState, useEffect } from "react";

function MoterVibrationChart(props) {
  const [alertvalue, setAlertvalue] = useState(0);

  const vibalertA = 6;
  const vibalertB = 7.5;
  const vibalertC = 9;

  const moterVibrationOption = {
    chart: {
      type: "spline",
      backgroundColor: false,
      zoomType: "x",
      height: 147,
    },
    title: {
      useHTML: true,
      floating: true,
      text: "펌프 부하/반부하 총진동량",
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
      valueSuffix: " rms/mm/s",
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
        text: "rms/mm/s",
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
      max: 10,
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
        // 주의
        {
          color: "#ffec58",
          dashStyle: "shortDash",
          value: vibalertA,
          width: 1,
          label: {
            text: "주의",
            color: "#ffec58",
            textAlign: "left",
            x: 330,
            y: -3,
            style: {
              color: "#ffec58",
              fontSize: 6,
            },
          },
        },
        {
          color: "#ff7600",
          dashStyle: "shortDash",
          value: vibalertB,
          width: 1,
          label: {
            text: "경고",
            color: "#ff7600",
            textAlign: "left",
            x: 330,
            y: -3,
            style: {
              color: "#ff7600",
              fontSize: 6,
            },
          },
        },
        {
          color: "#ff0000",
          dashStyle: "shortDash",
          value: vibalertC,
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

  const [moterVibrationOptions, setmoterVibrationOption] =
    useState(moterVibrationOption);

  useEffect(() => {
    setmoterVibrationOption((prevOptions) => {
      let make_err, make_non_err;
      if (Number(props.pumpnum) === 4) {
        make_err = 14;
        make_non_err = Math.floor(Math.random() * 3) + 1;
      } else {
        make_err = make_non_err = Math.floor(Math.random() * 3) + 1;
      }
      const dataArray = Array(24 * 7).fill(Number(make_err) * 0.01);
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
            value + value * 0.1 + Math.random() * 0.5 * make_non_err,
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
            value + Math.random() * 0.5 * make_err,
          ];
        })
        .sort((a, b) => a[0] - b[0]);

      // 알람 팝업
      // 부하 총진동량
      const dataAlert = dataVibOne.map((value) => {
        if (vibalertC < value[1]) {
          return 3;
        } else if (vibalertB < value[1]) {
          return 2;
        } else if (vibalertA < value[1]) {
          return 1;
        } else {
          return 0;
        }
      });
      // 반부하 총진동량
      const dataAlert2 = dataVibTwo.map((value) => {
        if (vibalertC < value[1]) {
          return 3;
        } else if (vibalertB < value[1]) {
          return 2;
        } else if (vibalertA < value[1]) {
          return 1;
        } else {
          return 0;
        }
      });

      setAlertvalue(
        Math.max(...dataAlert) > Math.max(...dataAlert2)
          ? Math.max(...dataAlert)
          : Math.max(...dataAlert2)
      );

      const options = {
        ...prevOptions,
        series: [
          {
            name: "부하 총진동량",
            data: dataVibOne,
            color: "#8098ff",
          },
          {
            name: "반부하 총진동량",
            data: dataVibTwo,
            color: "#7ed885",
          },
        ],
      };
      return options;
    });
  }, [props.pumpnum, alertvalue]);

  useEffect(() => {
    props.Vibalertfunction(alertvalue);
  }, [alertvalue, props]);

  return (
    <HighchartsReact highcharts={Highcharts} options={moterVibrationOptions} />
    // <h2>{props.testdata}</h2>
  );
}
export default MoterVibrationChart;
