import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useState, useEffect } from "react";

function PumpBearingChart(props) {
  const [alertvalue, setAlertvalue] = useState(0);

  const BearalertB = 1.0;
  const BearalertC = 1.6;

  const pumpBearingOption = {
    chart: {
      type: "spline",
      backgroundColor: false,
      zoomType: "x",
      // height: 147,
      height: 138,
      width: 440,
      spacing: [10, 16, 10, 12],
      events: {
        load: function () {
          const chart = this;
          // (x, y) 위치에 텍스트를 추가합니다.
          chart.renderer
            .text(
              '<p style="color: #fff; font-family: Pretendard; font-weight: bold;">펌프 </p>' +
                '<p style="color: #fff; font-family: Pretendard; font-weight: regular; font-size: 12px;">부하/반부하 베어링 결함</p>',
              20,
              30
            ) // x=20, y=20 위치에 '펌프' 텍스트
            // .css({
            //   color: "#fff",
            //   fontSize: "16px",
            //   fontWeight: "bold",
            //   top: "2px",
            // })
            .add();
        },
      },
    },
    title: {
      useHTML: true,
      floating: true,
      // text: "펌프 부하/반부하 베어링결함",
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
      // borderWidth: 0,
      // x: -30,
      // y: 0,
      itemStyle: {
        // fontFamily: "EliceDigitalBaeum",
        // textShadow: "0 0 9px #5cafff",
        // fontSize: "13px",
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
        return `<span style="color: #fff; font-family: Pretendard; font-weight: regular;">  ${this.name} </span>`;
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
          fontFamily: "Pretendard",
          fontSize: 12,
          // color: "rgba(211, 231, 255, 0.7)",
          color: "#CFD1D4",
        },
      },
      // lineColor: "rgba(157, 191, 255, 0.5)",
      lineColor: "#9FA3A9",
      tickColor: "#9FA3A9",
      tickInterval: 1000 * 60 * 60 * 24, // 24시간
    },
    yAxis: {
      title: {
        align: "middle",
        text: "인자",
        useHTML: true,
        // offset: 35,
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
      // lineColor: "rgba(157, 191, 255, 0.5)",
      lineColor: "#9FA3A9",
      lineWidth: 1,
      max: 1.9,
      min: 0,
      // gridLineColor: true,
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
          value: BearalertB,
          width: 1,
          label: {
            text: "경고",
            color: "#FF6600",
            textAlign: "left",
            x: 347,
            // y: -3,
            style: {
              color: "#FF6600",
              fontFamily: "Pretendard",
              fontStyle: "normal",
              fontWeigth: "normal",
              fontSize: "8px",
              // lineHeight: "10px",
              color: "#FF6600",
              letterSpacing: "0px",
            },
          },
        },
        {
          color: "#EA002C",
          dashStyle: "shortDash",
          value: BearalertC,
          width: 1,
          label: {
            text: "결함",
            color: "#EA002C",
            textAlign: "left",
            x: 347,
            style: {
              color: "#EA002C",
              fontFamily: "Pretendard",
              fontStyle: "normal",
              fontWeigth: "normal",
              fontSize: "8px",
              // lineHeight: "10px",
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

  const [pumpBearingOptions, setpumpBearingOption] =
    useState(pumpBearingOption);

  useEffect(() => {
    setpumpBearingOption((prevOptions) => {
      let make_err;
      if (Number(props.pumpnum) === 5) {
        make_err = 10;
      } else {
        make_err = Math.floor(Math.random() * 2) + 1;
      }
      const dataArray = Array(24 * 7).fill(make_err);
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
            value * 0.05 + value * 0.1 + Math.random() * 0.5,
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
            value * 0.05 + Math.random() * 0.5,
          ];
        })
        .sort((a, b) => a[0] - b[0]);

      // 알람 팝업
      // 부하 총진동량
      const dataAlert = dataVibOne.map((value) => {
        if (BearalertC < value[1]) {
          return 3;
        } else if (BearalertB < value[1]) {
          return 2;
        } else {
          return 0;
        }
      });
      // 반부하 총진동량
      const dataAlert2 = dataVibTwo.map((value) => {
        if (BearalertC < value[1]) {
          return 3;
        } else if (BearalertB < value[1]) {
          return 2;
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
            name: "부하 베어링",
            data: dataVibOne,
            color: "#8098ff",
          },
          {
            name: "반부하 베어링",
            data: dataVibTwo,
            color: "#7ed885",
          },
        ],
      };
      return options;
    });
  }, [props.pumpnum]);

  useEffect(() => {
    props.Bearalertfunction(alertvalue);
  }, [alertvalue, props]);

  return (
    <HighchartsReact highcharts={Highcharts} options={pumpBearingOptions} />
    // <h2>{props.testdata}</h2>
  );
}
export default PumpBearingChart;
