import styled from "styled-components";
import { css } from "styled-components";
import imgplate from '../peak_value_plate.png';
// import imgbackground from '../power_component_background.png';
import imgbackground from '../img/EMS/EMS-장기가압장bg.png'

import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";

import {useState,useEffect,useRef} from "react";

import Papa from "papaparse";

const Text = css`
    position: relative;
    font: normal normal normal 20px/24px Pretendard;
    letter-spacing: normal;
    text-align: left;
    color: #fff;

    // &.title{
    //     text-shadow: 0 0 6px #5cafff;
    //     font-size: 20px;
    //     line-height: 1.8;
    //     padding: 0 0 0 20px;
    // }
    &.amount_char{
        width: 220px;
        // text-shadow: 0 0 9px #5cafff;
        // font-size: 18px;
    }
    &.amount_num{
        width: 80px;
        font: normal normal bold 24px/29px Pretendard;
        text-align: right;
    }
    &.amount_degree{
        width: 50px;
        // font-family: Barlow;
        // font-size: 12px;
        font: normal normal normal 16px/19px Pretendard;
        color: #9FA3A9;
        padding: 10px 0 0 20px;
    }
    &.time_char{
        width: 220px;
        // text-shadow: 0 0 9px #5cafff;
        // font-size: 18px;
    }
    &.time_num{
        width: 240px;
        font: normal normal bold 24px/29px Pretendard;
        text-align: left;
    }
    &.value_char{
        // text-shadow: 0 0 9px #5cafff;
        // font-size: 18px;
        font: normal normal bold 20px/24px Pretendard;
        letter-spacing: 0px;
        color: #FFFFFF;
    }
    &.value_num{
        width: 100%;
        font: normal normal bold 40px/48px Pretendard;
        letter-spacing: 0px;
        color: #28FFF8;
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
        // width: 320px;
        // text-shadow: 0 0 6px #65b7ff;
        // font-size: 20px;
        height: 24px;
        text-align: center;
        font: normal normal normal 20px/24px Pretendard;
        letter-spacing: 0px;
        color: #FFFFFF;
        left:60px;
        margin-top:15px;
    }
    &.table_char{
        font: normal normal normal 14px/16px Pretendard;
        letter-spacing: 0px;
        color: #E7E8E9;
        opacity: 1;
    }
    &.table_num{
        width: 70px;
        text-align: right;
        font: normal normal bold 20px/24px Pretendard;
        letter-spacing: 0px;
        color: #CFD1D4;
        text-align: center;
    }
    &.table_degree{
        width: 20px;
        font: normal normal normal 12px/14px Pretendard;
        line-height: 2.4;
        color: rgba(255, 255, 255, 0.5);
        text-align: right;
    }
`;

const Power = styled.div`
    grid-area: left;
    position: relative;
    height: 1080px;
    padding: 32px 0 0 30px;
    display: grid;
    grid-template-rows: repeat(3, 216px 300px 385px);
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

const InfoSetBorder = styled.div`
    position: absolute;
    top:250px;
    left: 90px;
    width: 798px;
    height: 1px;
    background: #6F757E 0% 0% no-repeat padding-box;
    opacity: 1;
`;

const ChartBorder = styled.div`
    position: absolute;
    top:540px;
    left: 90px;
    width: 798px;
    height: 1px;
    background: #6F757E 0% 0% no-repeat padding-box;
    opacity: 1;
`;

const Title = styled.div`
    position: relative;
    grid-area: title;
    width: 310px;
    height: 37px;
    background: var(---0f1928) 0% 0% no-repeat padding-box;
    // background: #0F1928 0% 0% no-repeat padding-box;
// opacity: 0.5;
    text-align: left;
    margin: 0 0 0 60px;
    display:flex;
    align-items: center;
`
const TitleText = styled.span`
    position : relative;
    left:20px;
    font: normal normal bold 20px/24px Pretendard;
    letter-spacing: 0px;
    color: #FFFFFF;
    opacity: 1;
`

const TitleBorder = styled.div`
  position: absolute;
  left: 0;
  width: 310px;
  height: 2px;
  background: transparent linear-gradient(90deg, var(--dark-mode-3681ff) 0%, var(--dark-mode) 51%, var(--main-color) 100%) 0% 0% no-repeat padding-box;
    background: transparent linear-gradient(90deg, #3681FF 0%, #28FFF8 51%, #2CD2A2 100%) 0% 0% no-repeat padding-box;
    opacity: 1;
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
    position:relative;
    left:40px;
`;

const ContainerAmountText = styled.span`
 ${Text}
`

const ContainerTime = styled(Container)`
    width: 520px;
    grid-area: time;
    align-items: flex-start;
    position:relative;
    left:40px;
`;

const ContainerTimeText = styled.span`
 ${Text}
`
const ContainerMax = styled(Container)`
    grid-area: max;
    align-items: flex-start;
    position:relative;
    left:40px;
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
    padding: 0 0 0 0;
`
const ContainerValueText = styled.span`
 ${Text}
`
const ContainerValuenumset =styled.div`
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
      top: -10px;
      right: 0px;
      width: 890px;
      height: 845px;
      transform: scale(1.05)
    }
`;

const Chart = styled.div`
    grid-area: chart;
    display: flex;
    // justify-content: center;
    align-items: center;
    position:relative;
    left:60px;
`

const TableSet = styled.div`
    grid-area: table;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const TableText = styled.span`
    height: 50px;
    // padding: 10px 0 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    ${Text}
`

const Table = styled.div`
      width:100%;
      height: 230px;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1;
`

const TableContainer = styled(Table)`
    width: 408px;
    height: 240px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    &.pump{
        // background: rgba(15, 25, 40, 0.5) 0% 0% no-repeat padding-box;
    }
    &.value{
        // background: #0F1928 0% 0% no-repeat padding-box;
        margin: 0 0 0 8px;
    }
`

const TextSet =styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(15, 25, 40, 0.5) 0% 0% no-repeat padding-box;
    // margin-top:2px;
    width:100%;
    &.value{
        background: #0F1928 0% 0% no-repeat padding-box;
        // margin: 0 0 0 8px;
    }
`
const TestBorder = styled.div`
    position: relative;
    left: 0;
    width: 408px;
    height: 1px;
    background: #27303E 0% 0% no-repeat padding-box;
    opacity: 1;
`;


//chart
const chartsOptions =  {
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
                id : 'currentTime',
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
            fontFamily: "Pretendard",
            fontSize: "12px",
            color: "#CFD1D4",
            // textShadow: "0 0 6px #269bbe",
        },
        },
        lineColor: "#5e7aa5",
        tickInterval: 1000 * 60 * 60 * 8, // 8시간 간격
    },
    yAxis: {
        max:1200,
        plotLines: [
            {
                id:'peak-line',
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
            fontFamily: "Pretendard",
            fontSize: "12px",
            color: "#CFD1D4",
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

function PowerPeakLeft() {
    const [currentTime,setCurrentTime] = useState(Date.UTC(Number(new Date().getFullYear()), Number(new Date().getMonth()), Number(new Date().getDate()), Number(new Date().getHours()), Number(new Date().getMinutes())))
    const [jgpeakvalue,setJgpeakvalue] = useState(1014.35); //장기가압장 전력 피크
    const [jgpowervalue,setJgpowervalue] = useState(752.81); //장기가압장 전력 피크
    const [jgPeakTime,setJgPeakTime] = useState(Date.UTC(2024, 1, 2, 9, 0)); //장기가압장 전력 피크
    const [options, setOptions] = useState(chartsOptions);
    const [formattedData,setFormattedData] = useState([])
    const [predData,setPredData] = useState([])
    const [predPeakValue,setPredPeakValue] = useState(NaN)
    const [powerValuePump1,setPowerValuePump1] = useState(350)
    const [powerValuePump2,setPowerValuePump2] = useState(350)

    const hasRun = useRef(false);

    //현재 시간 
    useEffect(() =>{
        const intervaltime = setInterval(() => {
            const currentTimeint = Date.UTC(Number(new Date().getFullYear()), Number(new Date().getMonth()), Number(new Date().getDate()), Number(new Date().getHours()), Number(new Date().getMinutes()))
            setCurrentTime(currentTimeint)
        },1000*60)
        return () => clearInterval(intervaltime)
    },[]);

    // Value Update (1min)
    useEffect(() => {
        const intrval = setInterval(() => {
            // const randomPowerValue = (752.81+(Math.random()*100)).toFixed(2)
            const randomPeakValue = 1014.35
            const randomValueMinute = (Math.random()*0.05)
            const currentPowerValueMinute = formattedData.slice(Number(new Date().getHours()), Number(new Date().getHours())+1).reduce((max,cur)=>{return cur[1]},0)
            const pumpPower1Minute = Number(currentPowerValueMinute*(0.5+randomValueMinute))
            const pumpPower2Minute = Number(currentPowerValueMinute*(0.5-randomValueMinute))
            setPowerValuePump1(pumpPower1Minute)
            setPowerValuePump2(pumpPower2Minute)
            setJgpowervalue((currentPowerValueMinute+(Math.random()*20)).toFixed(2))
            setJgpeakvalue(randomPeakValue)
            

        },1000*60) // 1분마다 수정 
        return () => clearInterval(intrval)
    },[formattedData]);

    // 최대전력수요 변경 
    useEffect(()=>{
        setOptions((prevOptions) => {
            const updatedOptions = {
                xAxis:{
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
                            value: Number(jgpeakvalue), //
                        },
                    ],
                },
                series:[
                    {
                        name : '실 전력',
                        data : formattedData.slice(0, Number(new Date().getHours())+1),
                        color: '#4eb111'
                    },
                    {
                        name : '예측 전력',
                        data : predData,
                        dashStyle: 'Dot',
                        color: '#00ceff'
                    },
                    
                ]
            };
            return updatedOptions;
        });
    },[currentTime,jgpeakvalue,formattedData,predData]);

    // 현재 시간 기준으로 (실시간 전력 데이터 과거 24시간) / (실시간 기반 예측 전력 데이터 -24 ~ +24)
    // 1. csv파일 로드 
    
    if (!hasRun.current) { // 렌더링 방지지
        fetch("jg_data_test.csv") // ✅ `public/jg_data_test_2.csv` 로드
          .then((response) => response.text()) // ✅ 텍스트로 변환
          .then((csvText) => {
            Papa.parse(csvText, {
              complete: (result) => {
                const formattedDataO = result.data.map(((row)=>[
                    Date.UTC(Number(new Date().getFullYear()), Number(new Date().getMonth()), Number(new Date().getDate()), row.index, 0),parseFloat(row.value)
                ]))
                // console.log("📌 CSV 데이터:", result.data); // ✅ 콘솔에 CSV 데이터 출력
                // console.log(formattedDataO)
                setFormattedData(formattedDataO)
              },
              header: true, // ✅ 첫 번째 행을 키로 사용 (컬럼명 유지)
              skipEmptyLines: true,
            });
          })
          .catch((error) => console.error("🚨 CSV 파일을 불러오는 중 오류 발생:", error));
        
        hasRun.current = true;
    }
    useEffect(() => {
        const intrval = setInterval(() => {
        fetch("jg_data_test.csv") // ✅ `public/jg_data_test_2.csv` 로드
          .then((response) => response.text()) // ✅ 텍스트로 변환
          .then((csvText) => {
            Papa.parse(csvText, {
              complete: (result) => {
                const formattedDataO = result.data.map(((row)=>[
                    Date.UTC(Number(new Date().getFullYear()), Number(new Date().getMonth()), Number(new Date().getDate()), row.index, 0),parseFloat(row.value)
                ]))
                // console.log("📌 CSV 데이터:", result.data); // ✅ 콘솔에 CSV 데이터 출력
                // console.log(formattedDataO)
                setFormattedData(formattedDataO)
              },
              header: true, // ✅ 첫 번째 행을 키로 사용 (컬럼명 유지)
              skipEmptyLines: true,
            });
          })
          .catch((error) => console.error("🚨 CSV 파일을 불러오는 중 오류 발생:", error));
        },1000*60) // 1시간마다 수정 -> 1분마다 실행
        return () => clearInterval(intrval)
        }, []);

    // 전력 예측 데이터 난수로 수정 
    useEffect(() => {
        // console.log("formatted (최신 상태):", [
        //     ...formattedData.map(([timestamp, value]) => [timestamp, value]),
        //     ...formattedData.map(([timestamp, value])=>[
        //     timestamp + 24*60*60*1000, //+1일일
        //     value +  Math.floor(Math.random() * 100)
        // ])]);
        setPredData([
            ...formattedData.map(([timestamp, value]) => [timestamp, value +  Math.floor((Math.random()-0.5) * 100) ]),
            ...formattedData.map(([timestamp, value])=>[
            timestamp + 24*60*60*1000, //+1일일
            value +  Math.floor((Math.random()-0.5) * 100)
        ])]);
        
    }, [formattedData]); // ✅ formattedData가 변경될 때만 실행됨

    // 예상 데이터에 따라 값 수정 
    useEffect(() => {
        // console.log("predData (최신 상태):", typeof(predData),predData,typeof(predData.slice(1,3)));
        // console.log("predData max test:",predData.slice(Number(new Date().getHours())+1,48), predData.reduce((max,cur)=>{return cur[1] > max[1] ? cur : max},[0,0]));
        const predMAxArray = predData.slice(Number(new Date().getHours())+1,48).reduce((max,cur)=>{return cur[1] > max[1] ? cur : max},[0,0])
        const currentPowerValue = formattedData.slice(Number(new Date().getHours()), Number(new Date().getHours())+1).reduce((max,cur)=>{return cur[1]},0)
        const randomValue = (Math.random()*0.05)
        const pumpPower1 = Number(currentPowerValue*(0.5+randomValue))
        const pumpPower2 = Number(currentPowerValue*(0.5-randomValue))
        // console.log(pumpPower1);
        // console.log(pumpPower2);
        // console.log(formatDate(new Date(predMAxArray[0])));
        setPowerValuePump1(pumpPower1)
        setPowerValuePump2(pumpPower2)
        setPredPeakValue(predMAxArray[1].toFixed(2));
        setJgPeakTime(predMAxArray[0]-(1000*60*60*9));
    }, [predData,formattedData]); //  formattedData가 변경될 때만 실행됨


  return (
  <Power>
    <ImgPlate className='background' src ={imgbackground}></ImgPlate>
    <InfoSet>
        <Title>
            <TitleBorder className='top'></TitleBorder>
            <TitleText>건물 총 전력</TitleText>
            <TitleBorder className='bottom'></TitleBorder>
        </Title>
        <ContainerAmount>
            <ContainerAmountText className='amount_char'>· 현재사용량</ContainerAmountText>
            <ContainerAmountText className='amount_num'>{jgpowervalue}</ContainerAmountText>
            <ContainerAmountText className='amount_degree'>kW</ContainerAmountText>
        </ContainerAmount>
        <ContainerTime>
            <ContainerTimeText className='time_char'>· 예상 전력피크 시간</ContainerTimeText>
            <ContainerTimeText className='time_num'>{formatDate(new Date(jgPeakTime))} </ContainerTimeText>
        </ContainerTime>
        <ContainerMax>
            <ContainerMaxText className='amount_char'>·  최대전력수요</ContainerMaxText>
            <ContainerMaxText className='amount_num'>{jgpeakvalue}</ContainerMaxText>
            <ContainerMaxText className='amount_degree'>kW</ContainerMaxText>
        </ContainerMax>
        <ContainerValue>
            <ContainerValueText className='value_char'> 예상전력피크값 </ContainerValueText>
            <ContainerValuenumset>
                <ContainerValueText className='value_num'> {predPeakValue} </ContainerValueText>
                <ContainerValueText className='value_degree'> kW </ContainerValueText>
            </ContainerValuenumset>
            <ImgPlate className='plate' src ={imgplate}></ImgPlate>
        </ContainerValue>
    </InfoSet>
        <InfoSetBorder></InfoSetBorder>
    <Chart>
        <HighchartsReact highcharts={Highcharts} options={options} />
    </Chart>
    <ChartBorder></ChartBorder>
    <TableSet>
        <TableText className='table_title'>주요 전력 소비 인자</TableText>
        <Table>
            <TableContainer className='pump'>
            <TestBorder/>
            <TextSet>
                <TableText className='table_char'>1F</TableText>
            </TextSet>
            <TestBorder/>
            <TextSet>
                <TableText className='table_char'>2F</TableText>
            </TextSet>
            <TestBorder/>
            <TextSet>
                <TableText className='table_char'>3F</TableText>
            </TextSet>
            <TestBorder/>
            <TextSet>
                <TableText className='table_char'>4F</TableText>
            </TextSet>
            <TestBorder/>
            </TableContainer>
            <TableContainer className='value'>
                <TestBorder/>
                <TextSet className='value'>
                    <TableText className='table_num'>{(powerValuePump2*0.8).toFixed(2)}</TableText>
                    <TableText className='table_degree'>kW</TableText>
                </TextSet>
                <TestBorder/>
                <TextSet className='value'>
                    <TableText className='table_num'>{(powerValuePump1*0.7).toFixed(2)}</TableText>
                    <TableText className='table_degree'>kW</TableText>
                </TextSet>
                <TestBorder/>
                <TextSet className='value'>
                    <TableText className='table_num'>{(powerValuePump1*0.3).toFixed(2)}</TableText>
                    <TableText className='table_degree'>kW</TableText>
                </TextSet>
                <TestBorder/>
                <TextSet className='value'>
                    <TableText className='table_num'>{(powerValuePump2*0.2).toFixed(2)}</TableText>
                    <TableText className='table_degree'>kW</TableText>
                </TextSet>
                <TestBorder/>
            </TableContainer>
        </Table>
    </TableSet>
  </Power>
    
  );
}

export default PowerPeakLeft;

