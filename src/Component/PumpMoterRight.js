import styled from "styled-components";
import { css, keyframes } from "styled-components";
import { useState, useCallback, useEffect } from "react";

// chart
import MoterVibrationChart from "./PmsChart/moterVibrationchart.js";
import MoterBearingChart from "./PmsChart/moterBearingchart.js";
import MoterRoterChart from "./PmsChart/moterRoterchart.js";
import MoterTempChart from "./PmsChart/moterTempchart.js";

// chart_background 테스트 후 변경해야됨
import PMS_M_rms from "../img/pmschart/PMS_M_rms.png";
import PMS_M_bearing from "../img/pmschart/PMS_M_bearing.png";
import PMS_M_rotor from "../img/pmschart/PMS_M_rotor.png";
import PMS_M_temp from "../img/pmschart/PMS_M_temp.png";

// alert
import alertA from "../img/alertA.svg";
import alertB from "../img/alertB.svg";
import alertC from "../img/alertC.svg";

const Text = css`
  position: relative;
  font-family: Pretendard;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #fff;

  &.title {
    text-shadow: 0 0 6px #5cafff;
    font-size: 14px;
    line-height: 1.8;
    padding: 0 0 0 20px;
  }
  &.subtitle {
    font-size: 12px;
    line-height: 1.8;
    padding: 0 0 0 4px;
  }
`;
const PmsConponentRight = styled.div`
  //   grid-area: right;
  //   position: relative;
  //   height: 635.5px;
  //   display: grid;
  //   grid-template-rows: repeat(
  //     7,
  //     130.5px 33.5px 130.5px 33.5px 130.5px 33.5px 130.5px
  //   );
  //   grid-auto-flow: dense;
  //   grid-template-areas:
  //     "one"
  //     "."
  //     "two"
  //     "."
  //     "three"
  //     "."
  //     "four";
  // top: 188px;
  // left: 1440px;
  // width: 440px;
  // height: 138px;
`;

const Container = styled.div`
  position: relative;
  display: grid;
  grid-template-rows: 28.5px 102px;
  grid-auto-flow: dense;
  grid-template-areas:
    "title"
    "graph";
  &.container_one {
    grid-area: one;
  }
  &.container_two {
    grid-area: two;
  }
  &.container_three {
    grid-area: three;
  }
  &.container_four {
    grid-area: four;
  }
`;

const TitletextPMS = styled.div`
  ${Text}
  position: relative;
  grid-area: title;
  width: 278px;
  height: 25.8px;
  background-image: linear-gradient(
    to left,
    rgba(98, 128, 155, 0),
    #5e86a8,
    rgba(94, 142, 183, 0)
  );
  margin: 0 0 0 42px;
`;

const SubTitleTextPMS = styled.span`
  ${Text}
`;
const TitleBorderPMS = styled.div`
  position: absolute;
  left: 0;
  width: 278px;
  height: 1px;
  background-image: linear-gradient(
    to left,
    rgba(143, 202, 253, 0),
    #64b7fc,
    rgba(111, 188, 255, 0)
  );
  &.top {
    top: 0;
  }
  &.bottom {
    bottom: 0;
  }
`;

const PmsMRmsGraph = styled.div`
  position: absolute;
  //   position: relative;
  top: 188px;
  left: 1440px;
  width: 440px;
  height: 138px;
  background: transparent url(${PMS_M_rms}) 50% 50% no-repeat padding-box;
  opacity: 1;
`;

const PmsMBGraph = styled.div`
  position: absolute;
  //   position: relative;
  top: 352px;
  left: 1440px;
  width: 440px;
  height: 138px;
  background: transparent url(${PMS_M_bearing}) 50% 50% no-repeat padding-box;
  opacity: 1;
`;

const PmsMRotorGraph = styled.div`
  position: absolute;
  //   position: relative;
  top: 516px;
  left: 1440px;
  width: 440px;
  height: 138px;
  background: transparent url(${PMS_M_rotor}) 50% 50% no-repeat padding-box;
  opacity: 1;
`;
const PmsMTempGraph = styled.div`
  position: absolute;
  //   position: relative;
  top: 680px;
  left: 1440px;
  width: 440px;
  height: 138px;
  background: transparent url(${PMS_M_temp}) 50% 50% no-repeat padding-box;
  opacity: 1;
`;

const alertAnimation = keyframes`
  0% { offset-distance: 0%; opacity: 0; }
  10% { opacity: 0.5; } 25% { opacity: 1; }
  75% { opacity: 1; } 85% { opacity: 0.5; }
  100% { offset-distance: 100%; opacity: 0; }
`;

const Alertimg = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  animation: ${alertAnimation} 2s linear normal infinite;
  pointer-events: none;

  &.caution {
    background-image: url(${alertA});
  }
  &.warning {
    background-image: url(${alertB});
  }
  &.alarm {
    background-image: url(${alertC});
  }
`;

function PumpMoterRight(props) {
  const [vibalertValue, setVibalertValue] = useState("");
  const [bearalertValue, setBearalertValue] = useState("");
  const [roteralertValue, setRoteralertValue] = useState("");
  const [tempalertValue, setTempalertValue] = useState("");

  // const [pmsStats,setPmsStats] = useState([]);

  useEffect(() => {
    props.pmsStatsfunction({
      8: vibalertValue,
      9: bearalertValue,
      10: roteralertValue,
      11: tempalertValue,
    });
  }, [vibalertValue, bearalertValue, roteralertValue, tempalertValue, props]);

  const Vibalertfunction = useCallback((data) => {
    let alertvalueStr = "";
    if (data === 3) {
      alertvalueStr = "alarm";
    } else if (data === 2) {
      alertvalueStr = "warning";
    } else if (data === 1) {
      alertvalueStr = "caution";
    }
    setVibalertValue(alertvalueStr);
  }, []);
  const Bearalertfunction = useCallback((data) => {
    let alertvalueStr = "";
    if (data === 3) {
      alertvalueStr = "alarm";
    } else if (data === 2) {
      alertvalueStr = "warning";
    } else if (data === 1) {
      alertvalueStr = "caution";
    }
    setBearalertValue(alertvalueStr);
  }, []);

  const Roteralertfunction = useCallback((data) => {
    let alertvalueStr = "";
    if (data === 3) {
      alertvalueStr = "alarm";
    } else if (data === 2) {
      alertvalueStr = "warning";
    } else if (data === 1) {
      alertvalueStr = "caution";
    }
    setRoteralertValue(alertvalueStr);
  }, []);

  const Tempalertfunction = useCallback((data) => {
    let alertvalueStr = "";
    if (data === 3) {
      alertvalueStr = "alarm";
    } else if (data === 2) {
      alertvalueStr = "warning";
    } else if (data === 1) {
      alertvalueStr = "caution";
    }
    setTempalertValue(alertvalueStr);
  }, []);

  return (
    <PmsConponentRight>
      {/* <Alertimg className={vibalertValue}></Alertimg> */}
      {/* <TitletextPMS className='title'>모터
                    <SubTitleTextPMS className='subtitle'>부하/반부하 총진동량</SubTitleTextPMS>
                    <TitleBorderPMS className='top'></TitleBorderPMS>
                    <TitleBorderPMS className='bottom'></TitleBorderPMS>
                    </TitletextPMS> */}
      <PmsMRmsGraph>
        <MoterVibrationChart
          pumpnum={props.pumpnum}
          Vibalertfunction={Vibalertfunction}
        />
        {vibalertValue && <Alertimg className={vibalertValue} />}
      </PmsMRmsGraph>
      {/* <Container className = 'container_one'>
            </Container> */}
      {/* <Alertimg className={bearalertValue}></Alertimg> */}
      {/* <TitletextPMS className='title'>모터
                    <SubTitleTextPMS className='subtitle'>부하/반부하 베어링 결함</SubTitleTextPMS>
                    <TitleBorderPMS className='top'></TitleBorderPMS>
                    <TitleBorderPMS className='bottom'></TitleBorderPMS>
                </TitletextPMS> */}
      <PmsMBGraph>
        <MoterBearingChart
          pumpnum={props.pumpnum}
          Bearalertfunction={Bearalertfunction}
        />
        {bearalertValue && <Alertimg className={bearalertValue} />}
      </PmsMBGraph>
      {/* <Container className = 'container_two'>
            </Container> */}
      {/* <Alertimg className={roteralertValue}></Alertimg> */}
      {/* <TitletextPMS className='title'>모터
                    <SubTitleTextPMS className='subtitle'>회전자 결함</SubTitleTextPMS>
                    <TitleBorderPMS className='top'></TitleBorderPMS>
                    <TitleBorderPMS className='bottom'></TitleBorderPMS>
                </TitletextPMS> */}
      <PmsMRotorGraph>
        <MoterRoterChart
          pumpnum={props.pumpnum}
          Roteralertfunction={Roteralertfunction}
        />
        {roteralertValue && <Alertimg className={roteralertValue} />}
      </PmsMRotorGraph>
      {/* <Container className = 'container_three'>
            </Container> */}
      {/* <Alertimg className={tempalertValue}></Alertimg> */}
      {/* <TitletextPMS className='title'>모터
                    <SubTitleTextPMS className='subtitle'>권선 온도</SubTitleTextPMS>
                    <TitleBorderPMS className='top'></TitleBorderPMS>
                    <TitleBorderPMS className='bottom'></TitleBorderPMS>
                </TitletextPMS> */}
      <PmsMTempGraph>
        <MoterTempChart
          pumpnum={props.pumpnum}
          Tempalertfunction={Tempalertfunction}
        />
        {tempalertValue && <Alertimg className={tempalertValue} />}
      </PmsMTempGraph>
      {/* <Container className = 'container_four'>
            </Container> */}
    </PmsConponentRight>
  );
}
export default PumpMoterRight;
