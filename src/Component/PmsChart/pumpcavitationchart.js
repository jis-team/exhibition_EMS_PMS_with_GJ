import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { useState, useEffect } from "react";

function PumpCavitationChart(props) {
  const [alertvalue, setAlertvalue] = useState(0);

  const CavalertC = 1.0;

  const pumpCavitationOption = {
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
              '<p style="color: #fff; font-family: Pretendard; font-weight: bold;">펌프 </p>' +
                '<p style="color: #fff; font-family: Pretendard; font-weight: regular; font-size: 12px;">케비테이션 발생</p>',
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
      // text: "펌프 케비테이션 발생",
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
        offset: 45,
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
          color: "#EA002C",
          dashStyle: "shortDash",
          value: CavalertC,
          width: 1,
          label: {
            text: "결함",
            color: "#EA002C",
            textAlign: "left",
            x: 342,
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

  const [pumpCavitationOptions, setpumpCavitationOption] =
    useState(pumpCavitationOption);

  useEffect(() => {
    setpumpCavitationOption((prevOptions) => {
      let make_err;
      if (Number(props.pumpnum) === 7) {
        make_err = 8;
      } else {
        make_err = Math.floor(Math.random() * 3) + 1;
      }
      const dataArray = Array(24 * 7).fill(make_err);
      for (let i = 0; i < 3; i++) {
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
            value * 0.05 + value * 0.1 + Math.random() * 0.1,
          ];
        })
        .sort((a, b) => a[0] - b[0]);

      // 알람 팝업
      // 부하 총진동량
      const dataAlert = dataVibOne.map((value) => {
        if (CavalertC < value[1]) {
          return 3;
        } else {
          return 0;
        }
      });

      setAlertvalue(Math.max(...dataAlert));

      const options = {
        ...prevOptions,
        series: [
          {
            name: "펌프 케비테이션",
            data: dataVibOne,
            color: "#8098ff",
          },
        ],
      };
      return options;
    });
  }, [props.pumpnum]);

  useEffect(() => {
    props.Cavalertfunction(alertvalue);
  }, [alertvalue, props]);

  return (
    <HighchartsReact highcharts={Highcharts} options={pumpCavitationOptions} />
    // <h2>{props.testdata}</h2>
  );
}
export default PumpCavitationChart;
