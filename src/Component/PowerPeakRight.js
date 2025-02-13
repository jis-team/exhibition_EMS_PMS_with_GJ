import styled from "styled-components";
import { css } from "styled-components";
import imgplate from '../peak_value_plate.png';
import imgbackground from '../power_component_background.png';

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import { useState, useEffect, useRef } from "react";

import Papa from "papaparse";

// import React, { useRef } from "react";
import Draggable from 'react-draggable';
import alarm_img from '../ems-alarm.png';

const Text = css`
    position: relative;
    font-family: EliceDigitalBaeum;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
    color: #fff;

    &.title{
        text-shadow: 0 0 6px #5cafff;
        font-size: 20px;
        line-height: 1.8;
        padding: 0 0 0 20px;
    }
    &.amount_char{
        width: 220px;
        text-shadow: 0 0 9px #5cafff;
        font-size: 18px;
    }
    &.amount_num{
        width: 70px;
        text-shadow: 0 0 9px #5cafff;
        font-family: Barlow;
        font-size: 22px;
        text-align: right;
    }
    &.amount_degree{
        width: 50px;
        font-family: Barlow;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.5);
        padding: 10px 0 0 10px;
    }
    &.time_char{
        width: 220px;
        text-shadow: 0 0 9px #5cafff;
        font-size: 18px;
    }
    &.time_num{
        width: 230px;
        text-shadow: 0 0 9px #5cafff;
        font-family: Barlow;
        font-size: 22px;
        text-align: left;
    }
    &.value_char{
        text-shadow: 0 0 9px #5cafff;
        font-size: 18px;
    }
    &.value_num{
        width: 100%;
        text-shadow: 0 0 9px #5cafff;
        font-family: Barlow;
        font-size: 40px;
        line-height: 2.3;
        text-align: center;
    }
    &.value_degree{
        width: 35px;
        font-family: Barlow;
        font-size: 12px;
        color: rgba(255, 255, 255, 0.5);
        text-align: right;
        padding: 15px 0 0 0;
    }
    &.table_title{
        width: 320px;
        text-shadow: 0 0 6px #65b7ff;
        font-size: 20px;
        text-align: center;
    }
    &.table_char{
        text-shadow: 0 0 9px #5cafff;
        font-size: 14px;
        line-height: 1.6;
    }
    &.table_num{
        width: 70px;
        text-shadow: 0 0 6px #65b7ff;
        font-size: 18px;
        text-align: center;
    }
    &.table_degree{
        width: 20px;
        font-size: 11px;
        line-height: 2.4;
        color: rgba(255, 255, 255, 0.5);
        text-align: right;
    }
`;

const Power = styled.div`
    grid-area: right;
    position: relative;
    height: 1080px;
    // padding: 0 0 0 15px;
    display: grid;
    grid-template-rows: repeat(3, 216px 329px 325px);
    grid-template-columns: repeat(1, 954px);
    grid-auto-flow: dense;
    grid-template-areas:
        "info"
        "chart"
        "table";
`
const InfoSet = styled.div`
    grid-area: info;
    display: grid;
    grid-template-rows: repeat(4, 38px 73px 45px 45px);
    grid-template-columns: repeat(2, 430px 510px);
    grid-auto-flow: dense;
    grid-template-areas:
      "title title"
      "amount value"
      "time value"
      "max value";
`;

const Title = styled.div`
    // border: 2px solid #688397; // border 추가
    position: relative;
    grid-area: title;
    width: 288px;
    height: 37px;
    background-image: linear-gradient(to left, rgba(98, 128, 155, 0), #5e86a8, rgba(94, 142, 183, 0));
    margin: 0 0 0 60px;
    ${Text}
`

const TitleBorder = styled.div`
  position: absolute;
  left: 0;
  width: 288px;
  height: 1px;
  background-image: linear-gradient(to left, rgba(143, 202, 253, 0), #64b7fc, rgba(111, 188, 255, 0));
  &.top {
    top: 0;
  }
  &.bottom {
    bottom: 0;
  }
`;

const Container = styled.div`
    display: flex;
    justify-content: flex-end;
    align-items: center;
`;
const ContainerAmount = styled(Container)`
    grid-area: amount;
`;

const ContainerAmountText = styled.span`
 ${Text}
`

const ContainerTime = styled(Container)`
    width: 530px;
    grid-area: time;
    align-items: flex-start;
`;

const ContainerTimeText = styled.span`
 ${Text}
`
const ContainerMax = styled(Container)`
    grid-area: max;
    align-items: flex-start;
`

const ContainerMaxText = styled.span`
 ${Text}
`

const ContainerValue = styled(Container)`
    position: relative;
    top: 20px;
    grid-area: value;
    flex-direction: column;
    justify-content: center;
    padding: 0 0 0 70px;
`
const ContainerValueText = styled.span`
 ${Text}
`
const ContainerValuenumset = styled.div`
    display: flex;
    align-items: center;
`

const ImgPlate = styled.img`
    background-size: 100% 100%;
    background-repeat: no-repeat;
    z-index: 0;
    &.plate{
        position: relative;
      bottom: 30px;
      width: 268px;
      height: 52px;
    }
    &.background{
      position: absolute;
      top: 0;
      right: 0;
      width: 925px;
      height: 896px;
    }
`;

const Chart = styled.div`
    grid-area: chart;
    display: flex;
    justify-content: center;
    align-items: center;
`

const TableSet = styled.div`
    grid-area: table;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const TableText = styled.span`
    height: 50px;
    padding: 10px 0 0 0;
    font-family: Barlow;
    ${Text}

`

const Table = styled.div`
      width:100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
`

const TableContainer = styled(Table)`
    width: 160px;
    height: 257px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 10px 0 0 0;

    &.building{
        width: 160px;
        background-image: linear-gradient(to bottom, rgba(69, 108, 136, 0), rgba(32, 151, 192, 0.55) 24%, rgba(32, 151, 192, 0.55) 86%, rgba(69, 108, 136, 0));
        margin: 0 0 0 8px;
    } 
        
    &.value{
        width: 95px;
        background-image: linear-gradient(to bottom, rgba(69, 108, 136, 0), rgba(16, 81, 137, 0.55) 24%, rgba(16, 81, 137, 0.55) 86%, rgba(69, 108, 136, 0));
        margin: 0 0 0 8px;
        align-items: flex-start; // 수평
    }
`

const TextSet = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

// event button
const EvntBtn = styled.div`
    width: 80px;
    height: 30px;
    border-radius: 15px;
    border: solid 1px #688397;
    background-color: rgba(101, 183, 255, 0.35);
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    text-shadow: 0 0 6px #5cafff;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: center;
    color:rgb(220, 86, 86);
    margin: 0 35px 0 0;
    &.invisible {
      visibility: hidden;
    }
`
const EvntText = styled.span`
    // padding: 0 0 3px 10px;
    font-family: EliceDigitalBaeum;
    font-size: 15px;
    line-height: 1.4;
`
const Evnt = styled.div`
    // border: 2px solid #688397; 
    position: relative;
    grid-area: title;
    // grid-area: evnt btn;
    // position: relative;
    
    // background-image: linear-gradient(to left, rgba(98, 128, 155, 0), #5e86a8, rgba(94, 142, 183, 0));
    // // justify-content: flex-start;
    // // flex-wrap: nowrap;
    margin: 0 0 0 830px;
`;

// Styled-components
const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: transparent;
    z-index: 999;

    display: flex;
    justify-content: center;
    align-items: center;
`;
 
// ✅ 팝업창 스타일 (그리드 & 테두리 추가)
const Popup = styled.div`
    width: 400px;   
    padding: 15px;
    background: rgb(112, 9, 5);
    border-radius: 13px;
    position: fixed;
    top: 40%;
    left: 38%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    user-select: none; // ✅ 드래그할 때 선택 방지
    display: flex;
    flex-direction: column;
    border: 3px solid rgba(251, 113, 67, 0.7); // ✅ 테두리 추가
    box-shadow: 0px 4px 15px rgba(155, 43, 173, 0.2); // 그림자 효과
    overflow: hidden;
`;

// ✅ 헤더 스타일
const PopupHeader = styled.div`
    display: grid;
    grid-template-columns: 15px auto;
    align-items: center;
    color: rgba(243, 189, 189, 0.88);;
    font-size: 27px;
    font-weight: bold;
`;

// ✅ 헤더 이미지 스타일
const HeaderIcon = styled.img`
    padding: 10px;    
    width: 35px;
    height: 35px;
`;

// ✅ 내용 스타일 (그리드 적용)
const PopupContent = styled.div`
    padding: 20px;
    // text-align: left;
    text-align: center;
    font-size: 14px;
    color: rgba(255, 255, 255, 0.8);
    
    // add
    display: flex;
    flex-direction: column;
    align-items: center; // 자식 요소 가운데 정렬
`;

// ✅ 닫기 버튼 스타일
const CloseButton = styled.button`
    margin-top: 15px;
    padding: 10px 30px;
    background: rgb(3, 55, 107); // ✅ 파란색 버튼
    color: rgb(208, 217, 226);
    align-items: flex-center; // 오른쪽 정렬
    border: none;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    transition: 0.3s;
    &:hover {
        background: rgba(3, 112, 228, 0.91); // ✅ 마우스 오버 시 색상 변경
    }
`;


//chart
const chartsOptions = {
    chart: {
        type: "spline", //차트의 타입(형태)
        backgroundColor: null,
        zoomType: "x",
        width: 791,
        height: 297,
    },
    title: {
        useHTML: true,
        text: "장기가압장 전력 피크", //차트의 타이틀
        style: {
            color: "transparent",
        },
    },
    credits: {
        enabled: false,
    },
    legend: {
        enabled: false,
    },
    tooltip: {
        valueDecimals: 2,
        xDateFormat: "%Y-%m-%d %H:%M",
        useHTML: true,
        valueSuffix: " kW",
    },
    xAxis: {
        plotLines: [
            {
                id: 'currentTime',
                color: "red",
                dashStyle: 'Dot',
                value: Number(Date.UTC(Number(new Date().getFullYear()), Number(new Date().getMonth()), Number(new Date().getDate()), Number(new Date().getHours()), Number(new Date().getMinutes()))),
                width: 2,
                label: {
                    text: '현재시점',
                    textAlign: 'center',
                    rotation: 0,
                    y: -20,
                    style: {
                        color: '#fff',
                        fontSize: '12px'
                    }
                },
            },
        ],
        title: {
            text: "",
        },
        type: "datetime",
        labels: {
            format: "{value:%Y-%m-%d %H:%M}",
            style: {
                fontFamily: "Barlow",
                fontSize: "12px",
                color: "#d3e7ff",
                textShadow: "0 0 6px #269bbe",
            },
        },
        lineColor: "#5e7aa5",
        tickInterval: 1000 * 60 * 60 * 8, // 8시간 간격
    },
    yAxis: {
        max: 600,
        plotLines: [
            {
                id: 'peak-line',
                color: "red",
                value: 1000, // Y축에서 900 kW 위치에 가로선 추가
                width: 2,
                label: {
                    text: "최대 전력 수요",
                    align: "right",
                    y: -10,
                    style: { color: "#fff", fontSize: "12px" },
                },
            },
        ],
        title: {
            align: "high",
            text: "총 전력값",
            useHTML: true,
            offset: 0,
            rotation: 0,
            x: 5,
            y: -20,
            style: {
                fontFamily: "KHNPHUotfR",
                color: "#9baec5",
                fontSize: "10px",
            },
        },
        gridLineColor: false,
        labels: {
            style: {
                fontFamily: "Barlow",
                fontSize: "12px",
                color: "#d3e7ff",
            },
        },
        lineColor: "#5e7aa5",
        lineWidth: 1,
    },
    plotOptions: {
        series: {
            label: {
                connectorAllowed: false,
            },
            marker: {
                enabled: false,
            },
            lineWidth: 2,
            dataLabels: {
                enabled: true,
                formatter: function () {
                    if (this.point.index === this.series.points.length - 1) {
                        return `<span style="color: '#fff'; fontSize: 12;">${this.series.name}</span>`;
                    }
                },
            },
        },
    },
    exporting: {
        enabled: false,
    },

    series: [
    ],
}

//날짜 및 시간 포맷팅 함수
const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0"); // 월은 0부터 시작하므로 +1 필요
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");

    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

function UtcToDate(date) {
    const formattedDate = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')} \
    ${String(date.getUTCHours()).padStart(2, '0')}:${String(date.getUTCMinutes()).padStart(2, '0')}:${String(date.getUTCSeconds()).padStart(2, '0')}`;
    return formattedDate
}

function eachPower(totalPower) {
    const range = [
        [0.3, 0.4],     // 1-1
        [0.2, 0.3],     // 2-1
        [0.0, 0.1],     // 3-1
        [0.05, 0.15],   // 4-1
        [0.0, 0.05],    // 1-2
        [0.1, 0.2],     // 2-2
        [0.0, 0.05],    // 3-2
        [0.05, 0.1],    // 4-2
        [0.0, 0.05],    // 1-3
        [0.05, 0.15],   // 2-3
        [0.0, 0.05]     // 4-3
    ];
    let ratios = range.map(([min, max]) => min + Math.random() * (max - min));
    const sum = ratios.reduce((acc, ratio) => acc + ratio, 0);
    ratios = ratios.map(ratio => ratio / sum);
    const values = ratios.map(ratio => totalPower * ratio);
    return values;
}

function PowerPeakRight() {
    const updateTime = 1000 * 30 // 업데이트 시간
    const [currentTime, setCurrentTime] = 
        useState(Date.UTC(Number(new Date().getFullYear()), Number(new Date().getMonth()), Number(new Date().getDate()), 
                            Number(new Date().getHours()), Number(new Date().getMinutes())))
    const [gjpowervalue, setGjpowervalue] = useState(321.09); //공주정 현재사용량
    const [gjPeakTime, setGjPeakTime] = useState(Date.UTC(2025, 1, 12, 9, 0)); //공주정 전력피크예상시간
    const [gjpeakvalue, setGjpeakvalue] = useState(532.28); //공주정 최대전력수요
    const [predPeakValue, setPredPeakValue] = useState(NaN) //공주정 예상전력피크값
    const [options, setOptions] = useState(chartsOptions);
    const [formattedData, setFormattedData] = useState([])
    const [predData, setPredData] = useState([])
    const [powerVal1_1, setPowerVal1_1] = useState(350)
    const [powerVal2_1, setPowerVal2_1] = useState(350)
    const [powerVal3_1, setPowerVal3_1] = useState(350)
    const [powerVal4_1, setPowerVal4_1] = useState(350)
    const [powerVal1_2, setPowerVal1_2] = useState(350)
    const [powerVal2_2, setPowerVal2_2] = useState(350)
    const [powerVal3_2, setPowerVal3_2] = useState(350)
    const [powerVal4_2, setPowerVal4_2] = useState(350)
    const [powerVal1_3, setPowerVal1_3] = useState(350)
    const [powerVal2_3, setPowerVal2_3] = useState(350)
    const [powerVal3_3, setPowerVal3_3] = useState(350)
    const hasRun = useRef(false);
    // 드레그 팝업을 위한 정의
    const nodeRef = useRef(null); // useRef를 활용하여 직접 DOM을 참조
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    
    // console.log("[EMS-Right][%d:%d:%d] run", new Date().getHours(), new Date().getMinutes(), new Date().getSeconds());

    const PopupOpen = () => {
        const newCurVal = (gjpeakvalue + (Math.random() * 20)).toFixed(2)
        const targetDate = Date.UTC(Number(new Date().getFullYear()), Number(new Date().getMonth()), Number(new Date().getDate()), Number(new Date().getHours()), 0);
        const applyNewCurrPower = formattedData.map((item, index, arry) => {
            if (item[0] === targetDate){
                return [item[0], Number(newCurVal)]; 
            }
            else { 
                return [item[0], item[1]]; 
            }
        });
        setFormattedData(applyNewCurrPower);
        console.log("[EMS-Right][%d:%d:%d] %s: ", new Date().getHours(), new Date().getMinutes(), new Date().getSeconds(),  
                    "Event Button Clicked", newCurVal);
        setTimeout(()=>{
            setIsPopupOpen(true);
        }, 1000); // 2초 후에 팝업 띄움
    };
    
    const PopupClose = () => {
        setIsPopupOpen(false);
    };

    // 처음 한 번만 실행 (csv파일 로드)
    // 현재 시간 기준으로 (실시간 전력 데이터 과거 24시간) / (실시간 기반 예측 전력 데이터 -24 ~ +24)
    if (!hasRun.current) { // 렌더링 방지
        fetch("gj_data_test.csv") // ✅ `public/jg_data_test_2.csv` 로드
            .then((response) => response.text()) // ✅ 텍스트로 변환
            .then((csvText) => {
                Papa.parse(csvText, {
                    complete: (result) => {
                        const formattedDataO = result.data.map(((row) => [Date.UTC(Number(new Date().getFullYear()),
                            Number(new Date().getMonth()),
                            Number(new Date().getDate()),
                            row.index,
                            0), parseFloat(row.value)]))

                        const currentPowerValue = formattedDataO.slice(Number(new Date().getHours()), Number(new Date().getHours()) + 1).reduce((max, cur) => { return cur[1] }, 0)
                        const currPower = (currentPowerValue + (Math.random() * 20)).toFixed(2)
                        const targetDate = Date.UTC(Number(new Date().getFullYear()), Number(new Date().getMonth()), Number(new Date().getDate()), Number(new Date().getHours()), 0);
                        const applyNewCurrPower = formattedDataO.map((item, index, arry) => {
                            if (item[0] === targetDate){
                                return [item[0], Number(currPower)]; 
                            }
                            else { 
                                return [item[0], item[1]]; 
                            }
                        });
                        setGjpowervalue(Number(currPower)) // 공주정 현재 사용량
                        setFormattedData(applyNewCurrPower);

                        // UTC 시간을 연-월-일 시:분:초 형식으로 변환
                        const formattedUtcTime =
                            formattedDataO.map(item => {
                                const date = new Date(item[0]);
                                const formattedDate = UtcToDate(date)
                                return [formattedDate, item[1]];
                            });
                        console.log("[EMS-Right][%d:%d:%d] %s:", new Date().getHours(), new Date().getMinutes(), new Date().getSeconds(),
                            "📌 fisrt CSV 데이터", formattedUtcTime); 
                    },
                    header: true, // ✅ 첫 번째 행을 키로 사용 (컬럼명 유지)
                    skipEmptyLines: true,
                });
            })
            .catch((error) => console.error("[EMS-Right] 🚨 CSV 파일을 불러오는 중 오류 발생:", error));
        hasRun.current = true;
    }

    // csv 파일에서 데이터 로드하여 formattedData 변경
    useEffect(() => {
        const intrval = setInterval(() => {
            fetch("gj_data_test.csv") // ✅ `public/jg_data_test_2.csv` 로드
                .then((response) => response.text()) // ✅ 텍스트로 변환
                .then((csvText) => {
                    Papa.parse(csvText, {
                        complete: (result) => {
                            const formattedDataO = result.data.map(((row) => [Date.UTC(Number(new Date().getFullYear()),
                                Number(new Date().getMonth()),
                                Number(new Date().getDate()),
                                row.index,
                                0), parseFloat(row.value)]))
                            
                            const currentPowerValue = formattedDataO.slice(Number(new Date().getHours()), Number(new Date().getHours()) + 1).reduce((max, cur) => { return cur[1] }, 0)
                            const currPower = (currentPowerValue + (Math.random() * 20)).toFixed(2)
                            const targetDate = Date.UTC(Number(new Date().getFullYear()), Number(new Date().getMonth()), Number(new Date().getDate()), Number(new Date().getHours()), 0);
                            const applyNewCurrPower = formattedDataO.map((item, index, arry) => {
                                if (item[0] === targetDate) {
                                    return [item[0], Number(currPower)];
                                }
                                else {
                                    return [item[0], item[1]];
                                }
                            });
                            setGjpowervalue(Number(currPower)) // 공주정 현재 사용량
                            setFormattedData(applyNewCurrPower);

                            if (gjpowervalue < gjpeakvalue){
                                setIsPopupOpen(false);
                            }

                            // UTC 시간을 연-월-일 시:분:초 형식으로 변환
                            const formattedUtcTime =
                                formattedDataO.map(item => {
                                    const date = new Date(item[0]);
                                    const formattedDate = UtcToDate(date)
                                    return [formattedDate, item[1]];
                                });
                            console.log("[EMS-Right][%d:%d:%d] %s:", new Date().getHours(), new Date().getMinutes(), new Date().getSeconds(),
                                "✅ CSV 데이터", formattedUtcTime);     
                        },
                        header: true, // ✅ 첫 번째 행을 키로 사용 (컬럼명 유지)
                        skipEmptyLines: true,
                    });
                })
                .catch((error) => console.error("[EMS-Right]🚨 CSV 파일을 불러오는 중 오류 발생:", error));
        }, updateTime) // 1시간마다 수정 -> 일단 1분마다 실행
        return () => clearInterval(intrval)
    }, []);

    // 현재 시간 
    useEffect(() => {
        const intervaltime = setInterval(() => {
            const currentTimeint = Date.UTC(Number(new Date().getFullYear()), Number(new Date().getMonth()), Number(new Date().getDate()),
                                            Number(new Date().getHours()), Number(new Date().getMinutes()));
            setCurrentTime(currentTimeint)
            const currDate = new Date(currentTimeint);
            const formattedCurrentTime = `${currDate.getUTCFullYear()}-${String(currDate.getUTCMonth() + 1).padStart(2, '0')}-${String(currDate.getUTCDate()).padStart(2, '0')} ${String(currDate.getUTCHours()).padStart(2, '0')}:${String(currDate.getUTCMinutes()).padStart(2, '0')}:${String(currDate.getUTCSeconds()).padStart(2, '0')}`;
            console.log("[EMS-Right][%d:%d:%d] %s: ", new Date().getHours(), new Date().getMinutes(), new Date().getSeconds(), 
                        "currentTime", formattedCurrentTime);
        }, updateTime)
        return () => clearInterval(intervaltime) // 컴포넌트 언마운트 시 타이머 정리
    }, []);

    // formattedData 변경마다 업데이트, 전력 예측 데이터 난수로 수정 
    // formattedData 1->2일 변경 후, predData 수정
    useEffect(() => {
        // console.log("[EMS-Right][%d:%d:%d] %s: ", new Date().getHours(), new Date().getMinutes(), new Date().getSeconds(),
        //     "before predData", predData);
        const newpredData = [...formattedData.map(([timestamp, value]) => [timestamp, value + Math.floor((Math.random() - 0.5) * 100)]),
        ...formattedData.map(([timestamp, value]) => [
            timestamp + 24 * 60 * 60 * 1000, //+1일일
            value + Math.floor((Math.random() - 0.5) * 50)])]
        // console.log("[EMS-Right][%d:%d:%d] %s: ", new Date().getHours(), new Date().getMinutes(), new Date().getSeconds(),
        //     "after predData", newpredData);
        setPredData(newpredData); 
    }, [formattedData]); // ✅ formattedData가 변경될 때만 실행됨

    // predData 변경마다 업데이트
    useEffect(() => {
        const predMaxArray = predData.slice(Number(new Date().getHours()) + 1, 48).reduce((max, cur) => { return cur[1] > max[1] ? cur : max }, [0, 0])
        setPredPeakValue(predMaxArray[1].toFixed(2)); //공주정 예상전력피크값
        setGjPeakTime(predMaxArray[0] - (1000 * 60 * 60 * 9)); // 공주정 전력피크 예상시간

        const randomPeakValue = 532.28
        setGjpeakvalue(randomPeakValue) // 공주정 최대전력수요

        const currentPowerValue = formattedData.slice(Number(new Date().getHours()), Number(new Date().getHours()) + 1).reduce((max, cur) => { return cur[1] }, 0)
        setGjpowervalue(currentPowerValue) // 공주정 현재 사용량

        const eachPowers = eachPower(currentPowerValue);
        const powerVal1_1 = Number(eachPowers[0])
        const powerVal2_1 = Number(eachPowers[1])
        const powerVal3_1 = Number(eachPowers[2])
        const powerVal4_1 = Number(eachPowers[3])
        const powerVal1_2 = Number(eachPowers[4])
        const powerVal2_2 = Number(eachPowers[5])
        const powerVal3_2 = Number(eachPowers[6])
        const powerVal4_2 = Number(eachPowers[7])
        const powerVal1_3 = Number(eachPowers[8])
        const powerVal2_3 = Number(eachPowers[9])
        const powerVal3_3 = Number(eachPowers[10])
        setPowerVal1_1(powerVal1_1)
        setPowerVal2_1(powerVal2_1)
        setPowerVal3_1(powerVal3_1)
        setPowerVal4_1(powerVal4_1)
        setPowerVal1_2(powerVal1_2)
        setPowerVal2_2(powerVal2_2)
        setPowerVal3_2(powerVal3_2)
        setPowerVal4_2(powerVal4_2)
        setPowerVal1_3(powerVal1_3)
        setPowerVal2_3(powerVal2_3)
        setPowerVal3_3(powerVal3_3)
    }, [predData]); //  formattedData가 변경될 때만 실행됨

    useEffect(() => {
        setOptions((prevOptions) => {
            const updatedOptions = {
                xAxis: {
                    plotLines: [
                        {
                            ...prevOptions.xAxis.plotLines[0], // 
                            value: Number(currentTime), //
                        },
                    ],
                },
                yAxis: {
                    plotLines: [
                        {
                            ...prevOptions.yAxis.plotLines[0], // 
                            value: Number(gjpeakvalue), //
                        },
                    ],
                },
                series: [
                    {
                        name: '실 전력',
                        data: formattedData.slice(0, Number(new Date().getHours()) + 1),
                        color: '#4eb111'
                    },
                    {
                        name: '예측 전력',
                        data: predData,
                        dashStyle: 'Dot',
                        color: '#00ceff'
                    },

                ]
            };
            return updatedOptions;
        });
    }, [currentTime, formattedData, predData]);

    

    return (
        <Power>
            {isPopupOpen && (
                <>
                    <Overlay onClick={PopupClose} />
                    <Draggable nodeRef={nodeRef}>
                        {/* <Popup ref={nodeRef}>
                        <Popup ref={nodeRef} onClick={(e) => e.stopPropagation()}>
                            <h2>최대전력수요 초과</h2>
                            <p>현재 사용량은 {gjpowervalue} kW로 최대전력수요 전력을 초과했습니다.</p>
                            <CloseButton onClick={PopupClose}>닫기</CloseButton >
                        </Popup> */}
                        <Popup ref={nodeRef}>
                            {/* ✅ 헤더 부분 (아이콘 + 제목) */}
                            <PopupHeader>
                                <HeaderIcon src={alarm_img} alt="icon" />
                                최대전력수요 초과
                            </PopupHeader>

                            {/* ✅ 내용 부분 */}
                            <PopupContent>
                                <p>현재 사용량({gjpowervalue}kW)이 최대전력수요 전력을 초과했습니다.</p>
                                <CloseButton onClick={PopupClose}>닫기</CloseButton>
                            </PopupContent>
                        </Popup>
                    </Draggable>
                </>
            )}
            <ImgPlate className='background' src={imgbackground}></ImgPlate>
            <InfoSet>
                <Title className='title'>공주 정수장
                    <TitleBorder className='top'></TitleBorder>
                    <TitleBorder className='bottom'></TitleBorder>
                </Title>
                <Evnt>
                    <EvntBtn onClick={PopupOpen}>
                        <EvntText>EVENT</EvntText>
                    </EvntBtn>
                </Evnt>
                <ContainerAmount>
                    <ContainerAmountText className='amount_char'>· 현재 사용량</ContainerAmountText>
                    <ContainerAmountText className='amount_num'>{gjpowervalue}</ContainerAmountText>
                    <ContainerAmountText className='amount_degree'>kW</ContainerAmountText>
                </ContainerAmount>
                <ContainerTime>
                    <ContainerTimeText className='time_char'>· 예상 전력피크 시간</ContainerTimeText>
                    <ContainerTimeText className='time_num'>{formatDate(new Date(gjPeakTime))} </ContainerTimeText>
                </ContainerTime>
                <ContainerMax>
                    <ContainerMaxText className='amount_char'>·  최대전력수요</ContainerMaxText>
                    <ContainerMaxText className='amount_num'>{gjpeakvalue}</ContainerMaxText>
                    <ContainerMaxText className='amount_degree'>kW</ContainerMaxText>
                </ContainerMax>
                <ContainerValue>
                    <ContainerValueText className='value_char'> 예상전력피크값 </ContainerValueText>
                    <ContainerValuenumset>
                        <ContainerValueText className='value_num'> {predPeakValue} </ContainerValueText>
                        <ContainerValueText className='value_degree'> kW </ContainerValueText>
                    </ContainerValuenumset>
                    <ImgPlate className='plate' src={imgplate}></ImgPlate>
                </ContainerValue>
            </InfoSet>
            <Chart>
                <HighchartsReact highcharts={Highcharts} options={options} />
            </Chart>
            <TableSet>
                <TableText className='table_title'>주요 전력 소비 인자</TableText>
                <Table>
                    <TableContainer className='building'>
                        <TableText className='table_char'>막여과 설비 3(원수펌프)</TableText>
                        <TableText className='table_char'>막여과 설비 1</TableText>
                        <TableText className='table_char'>막여과 설비 2(조명설비)</TableText>
                        <TableText className='table_char'>관리동 설비</TableText>
                    </TableContainer>
                    <TableContainer className='value'>
                        <TextSet>
                            <TableText className='table_num'>{powerVal1_1.toFixed(2)}</TableText>
                            <TableText className='table_degree'>kW</TableText>
                        </TextSet>
                        <TextSet>
                            <TableText className='table_num'>{powerVal2_1.toFixed(2)}</TableText>
                            <TableText className='table_degree'>kW</TableText>
                        </TextSet>
                        <TextSet>
                            <TableText className='table_num'>{powerVal3_1.toFixed(2)}</TableText>
                            <TableText className='table_degree'>kW</TableText>
                        </TextSet>
                        <TextSet>
                            <TableText className='table_num'>{powerVal4_1.toFixed(2)}</TableText>
                            <TableText className='table_degree'>kW</TableText>
                        </TextSet>
                    </TableContainer>
                    <TableContainer className='building'>
                        <TableText className='table_char'>분말활성탄 약품투입 설비</TableText>
                        <TableText className='table_char'>혼화응집설비</TableText>
                        <TableText className='table_char'>염소주입설비</TableText>
                        <TableText className='table_char'>정배수지설비</TableText>
                    </TableContainer>
                    <TableContainer className='value'>
                        <TextSet>
                            <TableText className='table_num'>{powerVal1_2.toFixed(2)}</TableText>
                            <TableText className='table_degree'>kW</TableText>
                        </TextSet>
                        <TextSet>
                            <TableText className='table_num'>{powerVal2_2.toFixed(2)}</TableText>
                            <TableText className='table_degree'>kW</TableText>
                        </TextSet>
                        <TextSet>
                            <TableText className='table_num'>{powerVal3_2.toFixed(2)}</TableText>
                            <TableText className='table_degree'>kW</TableText>
                        </TextSet>
                        <TextSet>
                            <TableText className='table_num'>{powerVal4_2.toFixed(2)}</TableText>
                            <TableText className='table_degree'>kW</TableText>
                        </TextSet>
                    </TableContainer>
                    <TableContainer className='building'>
                        <TableText className='table_char'>농축슬러지설비</TableText>
                        <TableText className='table_char'>탈수기설비</TableText>
                        <TableText className='table_char'>DAF동설비</TableText>
                    </TableContainer>
                    <TableContainer className='value'>
                        <TextSet>
                            <TableText className='table_num'>{powerVal1_3.toFixed(2)}</TableText>
                            <TableText className='table_degree'>kW</TableText>
                        </TextSet>
                        <TextSet>
                            <TableText className='table_num'>{powerVal2_3.toFixed(2)}</TableText>
                            <TableText className='table_degree'>kW</TableText>
                        </TextSet>
                        <TextSet>
                            <TableText className='table_num'>{powerVal3_3.toFixed(2)}</TableText>
                            <TableText className='table_degree'>kW</TableText>
                        </TextSet>
                    </TableContainer>
                </Table>
            </TableSet>
        </Power>

    );
}


export default PowerPeakRight;