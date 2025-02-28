import Header from "../Component/Header";
import styled from "styled-components";
import PumpMoterLeft from "../Component/PumpMoterLeft";
import PumpMoterMiddle from "../Component/PumpMoterMiddle";
import { useState, useCallback, useEffect } from "react";
import PumpMoterBottom from "../Component/PumpMoterBottom";
import PumpMoterRight from "../Component/PumpMoterRight";

const Wrapper = styled.div`
  // width: 100%;
  // min-height: 100vh;
  // overflow-x: hidden;
  // position: relative;
  background: linear-gradient(#466d89, #041527);
  width: 100vw;
  height: 100vh;
  min-height: 1080px;
  text-align: center;
  overflow: hidden;
  user-select: none;
`;

const Headerclass = styled.div`
  // height: 90px;
  // max-width: 1920px;
  // margin: auto;
`;
const PmsWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 1920px;
  max-height: 1080px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(3, 510px 900px 510px);
  grid-template-rows: repeat(4, 1.5% 5% 635.5px 302px);
  grid-auto-flow: dense;
  grid-template-areas:
    ". . ."
    "title-set title-set title-set"
    "left middle right"
    "bottom bottom bottom";
`;

const Titleset = styled.div`
  grid-area: title-set;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
`;

const TitletSetText = styled.span`
  font-family: EliceDigitalBaeum;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #fff;
  width: 500px;
  text-shadow: 0 0 6px #5cafff;
  // font-family: EliceDigitalBaeum-Bd;
  text-shadow: 0 0 3px #000;
  font-size: 30px;
  line-height: 1.47;
  margin-left: -90px;
`;

function PMS() {
  const [parentData, setParentData] = useState("1");
  const [pmsStatsF, setPmsStatsF] = useState("normal");
  const [pmsStats, setPmsStats] = useState("normal");
  const [pmsStats1, setPmsStats1] = useState("normal");
  const [pmsStats2, setPmsStats2] = useState("normal");

  const testfunction = useCallback((data) => {
    setParentData((prev) => (prev !== data ? data : prev));
  }, []);

  const pmsStatsfunction = useCallback((data) => {
    let pmsstatsTest = Object.keys(data).reduce((acc, key) => {
      if (data[key] === "alarm") return key;
      // if (acc==='' && data[key]==="warning") return key;
      // else if (acc==='' && data[key]==="caution") return key;
      return acc;
    }, "");
    // console.log('cur',pmsstatsTest)
    setPmsStats(pmsstatsTest);
  }, []);

  const pmsStatsfunction1 = useCallback((data) => {
    let pmsstatsTest1 = Object.keys(data).reduce((acc, key) => {
      if (data[key] === "alarm") return key;
      // if (acc==='' && data[key]==="warning") return key;
      // else if (acc==='' && data[key]==="caution") return key;
      return acc;
    }, "");
    // console.log('cur1',pmsstatsTest1)
    setPmsStats1(pmsstatsTest1);
  }, []);

  const pmsStatsfunction2 = useCallback((data) => {
    let pmsstatsTest2 = Object.keys(data).reduce((acc, key) => {
      if (data[key] === "alarm") return key;
      // if (acc==='' && data[key]==="warning") return key;
      // else if (acc==='' && data[key]==="caution") return key;
      return acc;
    }, "");
    // console.log('cur2',pmsstatsTest2)
    setPmsStats2(pmsstatsTest2);
  }, []);

  useEffect(() => {
    // console.log('pmsStats',pmsStats)
    // console.log('pmsStats1',pmsStats1)
    // console.log('pmsStats2',pmsStats2)
    if (pmsStats === "" && pmsStats1 === "") {
      setPmsStatsF(pmsStats2);
    } else if (pmsStats1 === "") {
      setPmsStatsF(pmsStats);
    } else if (pmsStats === "") {
      setPmsStatsF(pmsStats1);
    } else {
      setPmsStatsF(() => {
        switch (Math.floor(Math.random() * 3)) {
          case 0:
            return pmsStats;
          case 1:
            return pmsStats1;
          case 2:
            return pmsStats2;
          default:
            return pmsStats;
        }
      });
    }
  }, [pmsStats, pmsStats1, pmsStats2]);

  // 1번 Dataset조회 및 값 확인하여 상태값 설정하기 -> 2번 Dataset 조회 및 값 확인하여 상태값 설정하기
  return (
    <Wrapper>
      <Headerclass>
        <Header />
      </Headerclass>
      <PmsWrapper>
        <Titleset>
          <TitletSetText>설비별 정밀진단</TitletSetText>
        </Titleset>
        <PumpMoterLeft
          pumpnum={parentData}
          setPumpNum={testfunction}
          pmsStatsfunction={pmsStatsfunction}
        />
        <PumpMoterBottom
          pumpnum={parentData}
          pmsStatsfunction={pmsStatsfunction1}
        />
        <PumpMoterRight
          pumpnum={parentData}
          setPumpNum={testfunction}
          pmsStatsfunction={pmsStatsfunction2}
        />
        <PumpMoterMiddle
          pumpnum={parentData}
          setPumpNum={testfunction}
          pmsStats={pmsStatsF}
        />
      </PmsWrapper>
    </Wrapper>
  );
}
export default PMS;
