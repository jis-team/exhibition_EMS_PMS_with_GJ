import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { useState, useEffect } from "react";

function PumpMisalignmentChart(props) {
  const [alertvalue, setAlertvalue] = useState(0);

  const MisalignmentB = 1.0;
  const MisalignmentC = 1.2;

  const pumpMisalignmentOption = {
    chart: {
      type: "spline",
      backgroundColor: false,
      zoomType: "x",
      height: 194,
      width: 580,
      spacing: [10, 16, 10, 12],
      events: {
        load: function () {
          const chart = this;
          // (x, y) 위치에 텍스트를 추가합니다.
          chart.renderer
            .text(
              //   '<p style="color: #fff; font-family: Pretendard; font-weight: bold;">펌프모터 </p>' +
              //     '<p style="color: #fff; font-family: Pretendard; font-weight: regular; font-size: 12px;">질량 불평형</p>',
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
                opacity: 1;">펌프모터 </p>` +
                `<p style="text-align: left;
                  font-style: normal;
                  font-variant: normal;
                  font-weight: normal;
                  font-size: 14px;
                  line-height: 14px;
                  font-family: Pretendard;
                  letter-spacing: 0px;
                  color: #E7E8E9;
                  opacity: 1;">질량 불평형</p>`,
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
      //   text: "펌프모터 질량 불평형",
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
      //   x: -30,
      //   y: 0,
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
      max: 1.8,
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
          color: "#FF6600",
          dashStyle: "shortDash",
          value: MisalignmentB,
          width: 1,
          label: {
            text: "경고",
            color: "#FF6600",
            textAlign: "left",
            x: 486,
            // y: -3,
            style: {
              fontFamily: "Pretendard",
              fontStyle: "normal",
              fontWeigth: "normal",
              fontSize: "8px",
              color: "#FF6600",
              letterSpacing: "0px",
            },
          },
        },
        {
          color: "#EA002C",
          dashStyle: "shortDash",
          value: MisalignmentC,
          width: 1,
          label: {
            text: "결함",
            color: "#EA002C",
            textAlign: "left",
            x: 486,
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

  const [pumpMisalignmentOptions, setpumpMisalignmentOption] = useState(
    pumpMisalignmentOption
  );

  useEffect(() => {
    setpumpMisalignmentOption((prevOptions) => {
      let make_err;
      if (Number(props.pumpnum) === 9) {
        make_err = 6;
      } else {
        make_err = Math.floor(Math.random() * 3) + 1;
      }
      const dataArray = Array(24 * 7).fill(make_err);
      for (let i = 0; i < 13; i++) {
        // 0으로 변경할 값의 개수
        const randomIndex = Math.floor(Math.random() * dataArray.length);
        dataArray[randomIndex] = 0;
      }
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
            //parseFloat(((value * 0.13) + (value * 0.1) + ((Math.random() * 0.1))).toFixed(0))]
            parseFloat(
              (value * 0.13 + value * 0.1 + Math.random() * 0.1).toFixed(1)
            ),
          ];
        })
        .sort((a, b) => a[0] - b[0]);
      // console.log("[PMS][%d:%d:%d] %s: ", new Date().getHours(), new Date().getMinutes(), new Date().getSeconds(),
      //     "dataVibOne", dataVibOne);

      // 알람 팝업
      // 부하 총진동량
      const dataAlert = dataVibOne.map((value) => {
        if (MisalignmentC <= value[1]) {
          return 3;
        } else if (MisalignmentB <= value[1]) {
          return 2;
        } else {
          return 0;
        }
      });
      setAlertvalue(Math.max(...dataAlert));

      const options = {
        ...prevOptions,
        series: [
          {
            name: "펌프모터 질량 불평형",
            data: dataVibOne,
            color: "#8098ff",
          },
        ],
      };
      return options;
    });
  }, [props.pumpnum]);

  useEffect(() => {
    props.Misalingmentfunction(alertvalue);
  }, [alertvalue, props]);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      options={pumpMisalignmentOptions}
    />
    // <h2>{props.testdata}</h2>
  );
}
export default PumpMisalignmentChart;
