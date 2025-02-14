import styled from "styled-components";
import { css,keyframes } from "styled-components";
import {useState,useCallback,useEffect} from "react";

//chart
import PumpUnbalancechart from "./PmsChart/pumpUnbalancechart.js";
import PumpMisalignmentchart from "./PmsChart/pumpMisalignmentchart.js";
import PumpBTempchart from "./PmsChart/pumpBTempchart.js";

// alert 
import alertA from '../img/alertA.svg';
import alertB from '../img/alertB.svg';
import alertC from '../img/alertC.svg';

const Text = css`
    position: relative;
    font-family: EliceDigitalBaeumOTF;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
    color: #fff;

    &.title{
        text-shadow: 0 0 6px #5cafff;
        font-size: 14px;
        line-height: 1.8;
        padding: 0 0 0 20px;
    }
    &.subtitle{
        font-size: 12px;
        line-height: 1.8;
        padding: 0 0 0 4px;
    }
`;



const PmsConponentBottom =styled.div`
    grid-area: bottom;
    position: relative;
    width: 1920px;
    height : 280px;
    margin-top:30px;
    display: grid;
    grid-template-columns: repeat(3, 1fr 1fr 1fr);
    grid-auto-flow: dense;
    grid-template-areas:
        "one two three";
`

const Container = styled.div`
    position: relative;
    display: grid;
    width : 631px;
    grid-template-rows: 28.5px 102px;
    grid-auto-flow: dense;
    grid-template-areas:
      "title"
      "graph";
    &__one {
      grid-area: one;
    }
    &__two {
      grid-area: two;
    }
    &__three {
      grid-area: three;
    }
    &__four {
      grid-area: four;
    }
`

const TitletextPMS =styled.div`
    ${Text}
    position: relative;
    grid-area: title;
    width: 278px;
    height: 25.8px;
    background-image: linear-gradient(to left, rgba(98, 128, 155, 0), #5e86a8, rgba(94, 142, 183, 0));
    margin: 0 0 0 42px;
`

const SubTitleTextPMS = styled.span`
    ${Text}
`

const TitleBorderPMS = styled.div`
    position: absolute;
    left: 0;
    width: 278px;
    height: 1px;
    background-image: linear-gradient(to left, rgba(143, 202, 253, 0), #64b7fc, rgba(111, 188, 255, 0));
    &.top{
        top: 0;
    }
    &.bottom{
        bottom : 0;    
    }
`

const PMSGraph = styled.div`
    position: relative;
    left: 50px;
    bottom: 10px;
    grid-area: graph;
    width: 566px;
    height: 226px;
`

const alertAnimation = keyframes`
  0% { offset-distance: 0%; opacity: 0; }
  10% { opacity: 0.5; } 25% { opacity: 1; }
  75% { opacity: 1; } 85% { opacity: 0.5; }
  100% { offset-distance: 100%; opacity: 0; }
`;

const Alertimg = styled.div`
    position: absolute;
    top: -5px;
    left: 35px;
    width: 590px;
    height: 245px;
    background-size: 100% 100%;
    background-repeat: no-repeat;
    animation: ${alertAnimation} 2s linear normal infinite;
    
    &.caution {
      background-image: url(${alertA})
    }
    &.warning {
      background-image: url(${alertB})
    }
    &.alarm {
      background-image: url(${alertC})
    }
`

function PumpMoterBottom(props){
    const [UnbalanceValue,setUnbalanceValue] = useState("");
    const [MisalignmentValue,setMisalignmentValue] = useState("");
    const [BTempValue,setBTempValue] = useState("");
    const Unbalancefunction = useCallback((data) => {
        let alertvalueStr = '' 
        if (data === 3){
            alertvalueStr = 'alarm'
        } else if (data===2){
            alertvalueStr = 'warning'
        } else if (data===1){
            alertvalueStr = 'caution'
        } 
        setUnbalanceValue(alertvalueStr)

    },[])

    const Misalingmentfunction = useCallback((data) => {
        let alertvalueStr = '' 
        if (data === 3){
            alertvalueStr = 'alarm'
        } else if (data===2){
            alertvalueStr = 'warning'
        } else if (data===1){
            alertvalueStr = 'caution'
        } 
        setMisalignmentValue(alertvalueStr)

    },[])

    const BTempfunction = useCallback((data) => {
        let alertvalueStr = '' 
        if (data === 3){
            alertvalueStr = 'alarm'
        } else if (data===2){
            alertvalueStr = 'warning'
        } else if (data===1){
            alertvalueStr = 'caution'
        } 
        setBTempValue(alertvalueStr)

    },[])

    useEffect(()=>{
        // console.log(BTempValue)
        props.pmsStatsfunction({5:UnbalanceValue,6:MisalignmentValue,7:BTempValue})
    },[UnbalanceValue,MisalignmentValue,BTempValue,props])

    // useEffect(()=>{
    //     props.pmsStatsfunction({1:vibalertValue,2:bearalertValue,3:impalertValue,4:cavalertValue})
    // },[vibalertValue,bearalertValue,impalertValue,cavalertValue,props])

    return(
        <PmsConponentBottom>
            <Container className = 'container_one'> 
            <Alertimg className={UnbalanceValue}></Alertimg>
            <TitletextPMS className='title'>펌프모터
                    <SubTitleTextPMS className='subtitle'>축정렬 불량</SubTitleTextPMS>
                    <TitleBorderPMS className='top'></TitleBorderPMS>
                    <TitleBorderPMS className='bottom'></TitleBorderPMS>
                </TitletextPMS>
                <PMSGraph>
                    <PumpUnbalancechart pumpnum={props.pumpnum} Unbalancefunction={Unbalancefunction} />
                </PMSGraph>
            </Container>
            <Container className = 'container_two'> 
            <Alertimg className={MisalignmentValue}></Alertimg>
            <TitletextPMS className='title'>펌프모터
                    <SubTitleTextPMS className='subtitle'>질량 불평형</SubTitleTextPMS>
                    <TitleBorderPMS className='top'></TitleBorderPMS>
                    <TitleBorderPMS className='bottom'></TitleBorderPMS>
                </TitletextPMS>
                <PMSGraph>
                    <PumpMisalignmentchart pumpnum={props.pumpnum} Misalingmentfunction={Misalingmentfunction} />
                </PMSGraph>
            </Container>
            <Container className = 'container_three'> 
            <Alertimg className={BTempValue}></Alertimg>
            <TitletextPMS className='title'>펌프모터
                    <SubTitleTextPMS className='subtitle'>베어링 온도</SubTitleTextPMS>
                    <TitleBorderPMS className='top'></TitleBorderPMS>
                    <TitleBorderPMS className='bottom'></TitleBorderPMS>
                </TitletextPMS>
                <PMSGraph>
                    <PumpBTempchart pumpnum={props.pumpnum} BTempfunction={BTempfunction} />
                </PMSGraph>
            </Container>

        </PmsConponentBottom>
    )

}
export default PumpMoterBottom;