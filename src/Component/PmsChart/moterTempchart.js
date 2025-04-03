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
      height: 138,
      width: 440,
      spacing: [10, 16, 10, 12],
      events: {
        load: function () {
          const chart = this;
          // (x, y) 위치에 텍스트를 추가합니다.
          chart.renderer
            .text(
              // '<p style="color: #fff; font-family: Pretendard; font-weight: bold;">모터 </p>' +
              //   '<p style="color: #fff; font-family: Pretendard; font-weight: regular; font-size: 12px;">권선 온도</p>',
              `<p style="
                text-align: left;
                font-style: normal;
                font-variant: normal;
                font-weight: bold;
                font-size: 18px;
                line-height: 19px;
                font-family: Pretendard;
                letter-spacing: 0px;
                color: #FFFFFF;
                opacity: 1;">모터 </p>` +
                `<p style="text-align: left;
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-size: 14px;
                  line-height: 14px;
                  font-family: Pretendard;
                  letter-spacing: 0px;
                  color: #E7E8E9;
                  opacity: 1;">권선 온도</p>`,
              20,
              30
            )
            .add();
        },
      },
    },
    title: {
      useHTML: true,
      floating: true,
      // text: "모터 권선온도",
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
        text: "인자",
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
      max: 30,
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
        {
          color: "#EA002C",
          dashStyle: "shortDash",
          value: MoterTempC,
          width: 1,
          label: {
            text: "결함",
            color: "#EA002C",
            textAlign: "left",
            x: 347,
            style: {
              fontFamily: "Pretendard",
              fontStyle: "normal",
              fontWeigth: "normal",
              fontSize: "8px",
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
