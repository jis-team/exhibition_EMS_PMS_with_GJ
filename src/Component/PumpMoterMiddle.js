import styled from "styled-components";
import { css } from "styled-components";
import { useState } from "react";

import pmspumpNormal from "../img/pmspump/pmspump_normal.png";
import pmspumpBearing from "../img/pmspump/pmspump_bearing.png";
import pmspumpImpeller from "../img/pmspump/pmspump_impeller.png";
import pmspumpCavitation from "../img/pmspump/pmspump_cavitation.png";
import pmsmotorBearing from "../img/pmspump/pmsmotor_bearing.png";
import pmsmotorRoter from "../img/pmspump/pmsmotor_roter.png";
import pmspumpUnbalance from "../img/pmspump/pmspump_unbalance.png";
import pmsmotorMisalignment from "../img/pmspump/pmsmotor_misalignment.png";

import pumpMiddleBg from "../img/pumpBackground/pumpBg.png";
// import pumpMiddleBg2x from "../img/pumpBackground/pumpBg2x.png";

const Text = css`
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
  font-family: EliceDigitalBaeumOTF-Regula;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  color: #c3eaff;
  line-height: 1.5;
  text-shadow: 0 0 9px #5cafff;
  font-size: 10px;
`;

const PmsConponentMiddle = styled.div`
  // grid-area: middle;
  // position: relative;
  // display: grid;
  // width: 900px;
  // height: 635.5px;
  // padding: 0 0 14.3px;
  // box-shadow: 0 0 3px 0 #65b7ff;
  // border: solid 0.5px var(--powder-blue);
  // grid-auto-flow: dense;
  // grid-template-areas: "one";

  // position: relative;
  // top: 58px;
  // left: 510px;
  // width: 900px;
  // height: 630px;

  // top: 188px;
  // left: 510px;
  // width: 900px;
  // height: 630px;

  /* UI Properties */
  position: absolute;
  top: 188px;
  left: 510px;
  width: 900px;
  height: 630px;

  background: transparent url(${pumpMiddleBg}) 50% 50% no-repeat padding-box;
  opacity: 1;
`;
const PumpBtn = styled.span`
  // ${Text}
  // position: relative;
  // flex-direction: column;
  // justify-content: space-between;
  // position: relative;
  // float: left;

  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 3px;
  // margin-top: 20px;
  // padding-bottom: 10px;
  width: 70px;
  height: 120px;
  // border: solid 1px #6b8ea6;

  background: #0f1928 0% 0% no-repeat padding-box;
  border: 1px solid #3f4753;

  user-select: none;
  cursor: pointer;
  &.selected {
    // border: solid 1px #00c4ff;
    // background-color: rgba(0, 196, 255, 0.16);

    background: #0f1928 50% 50% no-repeat padding-box;
    border: 1px solid #28fff8;

    // 화살표 부분
    &::after {
      content: "";
      position: absolute;
      top: -20px;
      right: 26px;
      width: 0;
      height: 0;
      // border-radius
      border-left: 8px solid transparent;
      border-right: 8px solid transparent;
      border-bottom: 14px solid #28fff8;

      // border-left: 8px solid transparent;
      // border-right: 8px solid transparent;
      // border-bottom: 14px solid #00c4ff;
    }
  }
  &.alert {
    border: solid 0.5px #ff3e7a;
    background-color: rgba(255, 62, 122, 0.1);
  }
`;

// const ComponentOne = styled.div`
//   grid-area: one;
//   // height: 635.5px;
//   // display: grid;
//   // grid-template-rows: repeat(3, 67.7px 433.6px 134.2px);
//   // grid-auto-flow: dense;
//   // grid-template-areas:
//   //   "title"
//   //   "pump"
//   //   "choice";
// `;

const MiddleTitle = styled.div`
  // 원본
  // grid-area: title;
  // display: grid;
  // text-shadow: 0 0 9px #5cafff;
  // font-family: EliceDigitalBaeumOTF;
  // font-size: 18px;
  // font-weight: normal;
  // font-stretch: normal;
  // font-style: normal;
  // letter-spacing: normal;
  // color: #fff;
  // margin-top: 9px;
  // justify-content: center;
  // align-items: center;

  display: flex;
  color: #fff;
  padding-left: 30px;
  padding-top: 30px;
  padding-bottom: 24px;
`;

const MiddleText1 = styled.div`
  text-align: left;
  font-style: normal;
  font-variant: normal;
  font-weight: bold;
  font-size: 28px;
  line-height: 34px;
  font-family: Pretendard;
  letter-spacing: 0px;
  color: #ffffff;
  opacity: 1;
  padding-right: 5px;
`;

const MiddleText2 = styled.div`
  text-align: left;
  font-style: normal;
  font-variant: normal;
  font-weight: medium;
  font-size: 28px;
  line-height: 33px;
  font-family: Pretendard;
  letter-spacing: 0px;
  color: #cfd1d4;
  opacity: 1;
`;

// const MiddleTitleLine = styled.div`
//   left: 0;
//   bottom: 5;
//   width: 278px;
//   height: 3px;
//   background-image: linear-gradient(
//     to left,
//     rgba(143, 202, 253, 0),
//     #64b7fc,
//     rgba(111, 188, 255, 0)
//   );
// `;

const PumpImgCOmponent = styled.div`
  // grid-area: pump;
  // display: grid;
  display: flex;
  justify-items: center;
  justify-content: center;
  align-items: center;
`;
const PumpImg = styled.div`
  background-size: 100% 100%;
  background-repeat: no-repeat;
  display: flex;
  // width: 542px;
  // height: 389px;
  width: 572px;
  height: 382px;
  &.normal {
    background-image: url(${pmspumpNormal});
  }
  &.fault {
    background-image: url(${pmsmotorMisalignment});
  }
  &.pumpbearing {
    background-image: url(${pmspumpBearing});
  }
  &.pumpimpeller {
    background-image: url(${pmspumpImpeller});
  }
  &.pumpcavitation {
    background-image: url(${pmspumpCavitation});
  }
  &.pmspumpUnbalance {
    background-image: url(${pmspumpUnbalance});
  }
  &.moterbearing {
    background-image: url(${pmsmotorBearing});
  }
  &.moterroter {
    background-image: url(${pmsmotorRoter});
  }
`;

const PumpChoice = styled.div`
  // grid-area: choice;
  // display: flex;
  // justify-items: center;
  // justify-content: center;
  // align-items: center;
  // flex-direction: row;

  display: flex;
  width: 870px;
  margin: 20px 13px 20px 14px;
`;

const PumpNameText = styled.span`
  ${Text}
  font-family: Pretendard;
  user-select: none;
  cursor: pointer;

  text-align: center;
  font-style: normal;
  font-variant: normal;
  font-weight: normal;
  font-size: 14px; /* 기본 상태의 크기를 14px로 변경 */
  line-height: 14px;
  letter-spacing: 0px;
  color: #9fa3a9;
  line-height: 1.2;

  /* 선택된 상태 */
  &.selected {
    text-align: center;
    font-style: normal;
    font-variant: normal;
    font-weight: normal;
    font-size: 14px; /* 선택된 상태의 크기를 18px로 변경 */
    line-height: 14px;
    letter-spacing: 0px;
    color: #ffffff;
    line-height: 1.2;
  }
`;

const PumpImgSub = styled.div`
  // width: 52.8px;
  // height: 35.2px;
  width: 55px;
  height: 37px;
  padding-bottom: 12px;
  background-image: url(${pmspumpNormal});
  background-size: contain;
  background-repeat: no-repeat;
`;

function PumpMoterMiddle(props) {
  const [selectedPump, setSelectedPump] = useState("1");
  const PumpNum = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
  ];
  const pmsImgList = {
    "": "normal",
    1: "fault",
    2: "pumpbearing",
    3: "pumpimpeller",
    4: "pumpcavitation",
    5: "pmspumpUnbalance",
    6: "fault",
    7: "fault",
    8: "fault",
    9: "moterbearing",
    10: "moterroter",
    11: "fault",
  };

  // useEffect(()=>{
  //     console.log(props.pmsStats)
  //     console.log(pmsImgList[props.pmsStats])
  // },[props])

  return (
    <PmsConponentMiddle>
      {/* <MiddleTitle>
          <span>{selectedPump}번 정수장 펌프 모터</span>
          <MiddleTitleLine></MiddleTitleLine>
        </MiddleTitle> */}
      <MiddleTitle>
        <MiddleText1>{selectedPump}번 정수장</MiddleText1>
        <MiddleText2>펌프 모터</MiddleText2>
        {/* <span className="middle-text1">{selectedPump}번 정수장</span> */}
        {/* <span className="middle-text2">펌프 모터</span> */}
      </MiddleTitle>
      <PumpImgCOmponent>
        <PumpImg className={pmsImgList[props.pmsStats]}></PumpImg>
      </PumpImgCOmponent>
      <PumpChoice>
        {/* <> */}
        {PumpNum.map((num) => (
          <PumpBtn
            key={num}
            className={selectedPump === num ? "selected" : ""}
            onClick={() => {
              props.setPumpNum(num);
              setSelectedPump(num);
            }}
          >
            <PumpImgSub />
            {/* <PumpNameText>정수장 </PumpNameText>
            <PumpNameText>펌프모터</PumpNameText> */}
            <PumpNameText className={selectedPump === num ? "selected" : ""}>
              정수장
              <br />
              펌프모터
              <br />
              {num}
            </PumpNameText>
            {/* <PumpNameText className={selectedPump === num ? "selected" : ""}>
              {num}
            </PumpNameText> */}
            {/* <PumpNameText className="subtext">{num}</PumpNameText> */}
          </PumpBtn>
        ))}
        {/* </> */}
      </PumpChoice>
      {/* <ComponentOne>
      </ComponentOne> */}
    </PmsConponentMiddle>
  );
}
export default PumpMoterMiddle;
