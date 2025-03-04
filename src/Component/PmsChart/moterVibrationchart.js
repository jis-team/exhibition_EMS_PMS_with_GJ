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
      height: 138,
      width: 440,
      spacing: [1, 16, 10, 12],
      events: {
        load: function () {
          const chart = this;
          // (x, y) 위치에 텍스트를 추가합니다.
          chart.renderer
            .text(
              // '<p style="color: #fff; font-family: Pretendard; font-weight: bold;">모터 </p>' +
              //   '<p style="color: #fff; font-family: Pretendard; font-weight: regular; font-size: 12px;">부하/반부하 총진동량</p>',
              `<p style="
                text-align: left;
                font-style: normal;
                font-variant: normal;
                font-weight: bold;
                font-size: 16px;
                line-height: 19px;
                font-family: Pretendard;
                letter-spacing: 0px;
                color: #FFFFFF;
                opacity: 1;">모터 </p>` +
                `<p style="text-align: left;
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-size: 12px;
                  line-height: 14px;
                  font-family: Pretendard;
                  letter-spacing: 0px;
                  color: #E7E8E9;
                  opacity: 1;">부하/반부하 총진동량</p>`,
              20,
              22
            )
            .add();
        },
      },
    },
    title: {
      useHTML: true,
      floating: true,
      // text: "펌프 부하/반부하 총진동량",
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
      // x: -30,
      // y: 0,
      itemStyle: {
        textAlign: "right",
        fontFamily: "Pretendard",
        fontWeight: "normal",
        fontSize: "12px",
        lineHeight: "14px",
        letterSpacing: "0px",
        opacity: 1,
      },
      symbolWidth: 10,
      labelFormatter: function () {
        // return `<span style="color: #fff; font-family: Pretendard; font-weight: regular;">  ${this.name} </span>`;
        return `
        <span style="
          text-align: right;
          font-style: normal;
          font-variant: normal;
          font-weight: normal;
          font-size: 12px;
          line-height: 14px;
          font-family: Pretendard;
          letter-spacing: 0px;
          color: #FFFFFF;
          opacity: 1;"> ${this.name} </span>
        `;
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
        symbolHeight: 12,
        symbolWidth: 12,
        style: {
          fontFamily: "Pretendard",
          fontSize: 12,
          color: "#CFD1D4",
        },
      },
      lineColor: "#9FA3A9",
      tickColor: "#9FA3A9",
      tickInterval: 1000 * 60 * 60 * 24, // 24시간
    },
    yAxis: {
      title: {
        align: "middle",
        text: "rms/mm/s",
        useHTML: true,
        offset: 40,
        rotation: 90,
        // x: 0,
        // y: -5,
        style: {
          fontFamily: "Pretendard",
          fontStyle: "normal",
          fontWeigth: "normal",
          fontSize: "8px",
          lineHeight: "10px",
          color: "#CFD1D4",
          letterSpacing: "0px",
          textAlign: "left",
        },
      },
      lineColor: "#9FA3A9",
      lineWidth: 1,
      max: 10,
      min: 0,
      gridLineColor: false,
      labels: {
        align: "left",
        x: -30,
        style: {
          fontFamily: "Pretendard",
          fontStyle: "normal",
          fontWeigth: "normal",
          fontSize: "12px",
          lineHeight: "14px",
          color: "#CFD1D4",
          letterSpacing: "2px",
        },
      },
      plotLines: [
        // 주의
        {
          color: "#F5BF00",
          dashStyle: "shortDash",
          value: vibalertA,
          width: 1,
          label: {
            text: "주의",
            color: "#F5BF00",
            textAlign: "left",
            x: 350,
            // y: -3,
            style: {
              // color: "#F5BF00",
              // fontSize: 5,
              fontFamily: "Pretendard",
              fontStyle: "normal",
              fontWeigth: "normal",
              fontSize: "6px",
              // lineHeight: "10px",
              color: "#F5BF00",
              letterSpacing: "0px",
            },
          },
        },
        {
          color: "#FF6600",
          dashStyle: "shortDash",
          value: vibalertB,
          width: 1,
          label: {
            text: "경고",
            color: "#FF6600",
            textAlign: "left",
            x: 350,
            // y: -3,
            style: {
              // color: "#FF6600",
              // fontSize: 5,
              fontFamily: "Pretendard",
              fontStyle: "normal",
              fontWeigth: "normal",
              fontSize: "6px",
              // lineHeight: "10px",
              color: "#FF6600",
              letterSpacing: "0px",
            },
          },
        },
        {
          color: "#EA002C",
          dashStyle: "shortDash",
          value: vibalertC,
          width: 1,
          label: {
            text: "결함",
            color: "#EA002C",
            textAlign: "left",
            x: 350,
            style: {
              // color: "#EA002C",
              // fontSize: 6,
              // lineHeight: "10px",
              fontFamily: "Pretendard",
              fontStyle: "normal",
              fontWeigth: "normal",
              fontSize: "6px",
              color: "#EA002C",
              letterSpacing: "0px",
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
