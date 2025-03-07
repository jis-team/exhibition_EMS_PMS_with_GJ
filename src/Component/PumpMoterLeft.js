import styled from "styled-components";
import { css, keyframes } from "styled-components";
import { useState, useCallback, useEffect } from "react";

// chart
import PumpVibrationChart from "./PmsChart/PumpVibrationchart.js";
import PumpBearingChart from "./PmsChart/pumpBearingchart.js";
import PumpImpellerChart from "./PmsChart/pumpImpellerchart.js";
import PumpCavitationChart from "./PmsChart/pumpcavitationchart.js";

// chart_background
import PMS_P_rms from "../img/pmschart/PMS_P_rms.png";
import PMS_P_bearing from "../img/pmschart/PMS_P_bearing.png";
import PMS_P_impeller from "../img/pmschart/PMS_P_impeller.png";
import PMS_P_cavitation from "../img/pmschart/PMS_P_cavitation.png";

// alert
import alertA from "../img/alertA.svg";
import alertB from "../img/alertB.svg";
import alertC from "../img/alertC.svg";

const Text = css`
  position: relative;
  //   font-family: EliceDigitalBaeumOTF;
  font-family: Pretendard Variable;
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
const PmsConponentLeft = styled.div`
  position: absoulte;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  // position: relative;
  // grid-area: left;
  // position: relative;
  // height: 635.5px;
  // display: grid;
  // grid-template-rows: repeat(
  //   7,
  //   130.5px 33.5px 130.5px 33.5px 130.5px 33.5px 130.5px
  // );
  // grid-auto-flow: dense;
  // grid-template-areas:
  //   "one"
  //   "."
  //   "two"
  //   "."
  //   "three"
  //   "."
  //   "four";
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
const PmsPRmsGraph = styled.div`
  position: absolute;
  // position: relative;
  top: 188px;
  left: 40px;
  width: 440px;
  height: 138px;
  background: transparent url(${PMS_P_rms}) 50% 50% no-repeat padding-box;
  opacity: 1;
`;

const PmsPBGraph = styled.div`
  position: absolute;
  // position: relative;
  top: 352px;
  left: 40px;
  width: 440px;
  height: 138px;
  background: transparent url(${PMS_P_bearing}) 50% 50% no-repeat padding-box;
  opacity: 1;
`;

const PmsPImpGraph = styled.div`
  position: absolute;
  // position: relative;
  top: 516px;
  left: 40px;
  width: 440px;
  height: 138px;
  background: transparent url(${PMS_P_impeller}) 50% 50% no-repeat padding-box;
  opacity: 1;
`;

const PmsPCavGraph = styled.div`
  // position: relative;
  position: absolute;
  top: 680px;
  left: 40px;
  width: 440px;
  height: 138px;
  background: transparent url(${PMS_P_cavitation}) 50% 50% no-repeat padding-box;
  opacity: 1;
`;

// const PMSGraph = styled.div`
//   position: relative;
//   left: 50px;
//   bottom: 10px;
//   grid-area: graph;
//   width: 406px;
//   // height: 410px;
// `;

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
  transform: translateZ(0);
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

function PumpMoterLeft(props) {
  const [vibalertValue, setVibalertValue] = useState("");
  const [bearalertValue, setBearalertValue] = useState("");
  const [impalertValue, setImpalertValue] = useState("");
  const [cavalertValue, setCavalertValue] = useState("");

  // const [pmsStats,setPmsStats] = useState([]);

  useEffect(() => {
    props.pmsStatsfunction({
      1: vibalertValue,
      2: bearalertValue,
      3: impalertValue,
      4: cavalertValue,
    });
  }, [vibalertValue, bearalertValue, impalertValue, cavalertValue, props]);

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

  const Impalertfunction = useCallback((data) => {
    let alertvalueStr = "";
    if (data === 3) {
      alertvalueStr = "alarm";
    } else if (data === 2) {
      alertvalueStr = "warning";
    } else if (data === 1) {
      alertvalueStr = "caution";
    }
    setImpalertValue(alertvalueStr);
  }, []);

  const Cavalertfunction = useCallback((data) => {
    let alertvalueStr = "";
    if (data === 3) {
      alertvalueStr = "alarm";
    } else if (data === 2) {
      alertvalueStr = "warning";
    } else if (data === 1) {
      alertvalueStr = "caution";
    }
    setCavalertValue(alertvalueStr);
  }, []);

  return (
    <PmsConponentLeft>
      {/* <Alertimg className={vibalertValue}></Alertimg> */}
      {/* <TitletextPMS className="title">
        펌프
        <SubTitleTextPMS className='subtitle'>부하/반부하 총진동량</SubTitleTextPMS>
        <TitleBorderPMS className="top"></TitleBorderPMS>
        <TitleBorderPMS className="bottom"></TitleBorderPMS>
        </TitletextPMS> */}
      <PmsPRmsGraph>
        <PumpVibrationChart
          pumpnum={props.pumpnum}
          Vibalertfunction={Vibalertfunction}
        />
        {vibalertValue && <Alertimg className={vibalertValue} />}
      </PmsPRmsGraph>
      {/* <Container className="container_one">
      </Container> */}
      {/* <Alertimg className={bearalertValue}></Alertimg> */}
      {/* <TitletextPMS className="title">
          펌프
          <SubTitleTextPMS className="subtitle">
          부하/반부하 베어링 결함
          </SubTitleTextPMS>
          <TitleBorderPMS className="top"></TitleBorderPMS>
          <TitleBorderPMS className="bottom"></TitleBorderPMS>
          </TitletextPMS> */}
      <PmsPBGraph>
        <PumpBearingChart
          pumpnum={props.pumpnum}
          Bearalertfunction={Bearalertfunction}
        />
        {bearalertValue && <Alertimg className={bearalertValue} />}
      </PmsPBGraph>
      {/* <Container className="container_two">
      </Container> */}
      {/* <Alertimg className={impalertValue}></Alertimg> */}
      {/* <TitletextPMS className="title">
          펌프
          <SubTitleTextPMS className="subtitle">임펠러 결함</SubTitleTextPMS>
          <TitleBorderPMS className="top"></TitleBorderPMS>
          <TitleBorderPMS className="bottom"></TitleBorderPMS>
          </TitletextPMS> */}
      <PmsPImpGraph>
        <PumpImpellerChart
          pumpnum={props.pumpnum}
          Impalertfunction={Impalertfunction}
        />
        {impalertValue && <Alertimg className={impalertValue} />}
      </PmsPImpGraph>
      {/* <Container className="container_three">
      </Container> */}
      {/* <Alertimg className={cavalertValue}></Alertimg> */}
      {/* <TitletextPMS className="title">
          펌프
          <SubTitleTextPMS className="subtitle">
          케비테이션 발생
          </SubTitleTextPMS>
          <TitleBorderPMS className="top"></TitleBorderPMS>
          <TitleBorderPMS className="bottom"></TitleBorderPMS>
          </TitletextPMS> */}
      <PmsPCavGraph>
        <PumpCavitationChart
          pumpnum={props.pumpnum}
          Cavalertfunction={Cavalertfunction}
        />
        {cavalertValue && <Alertimg className={cavalertValue} />}
      </PmsPCavGraph>
      {/* <Container className="container_four">
      </Container> */}
    </PmsConponentLeft>
  );
}
export default PumpMoterLeft;
