// logo
// import logo from "../juin_logo_.jpg";
import jis_logo from "../img/logo/jis_logo.png";
// import logo from '../kwater.png';
import logo_down_img from "../header_title_down.png";

import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Headerdiv = styled.div`
  width: 100%;
  max-height: 100px;
  // position: fixed; // 스크롤 시 헤더가 따라서 내려오게 position 설정
  top: 0;
  z-index: 999; // header가 항상 화면구성에서 맨 위여야 함 => z-index 설정 높임
  display: grid;
  align-content: center;
  grid-template-columns: repeat(3, 25% 50% 25%);
  grid-auto-flow: dense;
  grid-template-areas: "timer title login";
  margin-top: 20px;
`;

// const Timer = styled.div`
//   grid-area: timer;
//   font-weight: normal;
//   font-stretch: normal;
//   font-style: normal;
//   letter-spacing: normal;
//   text-align: left;
//   color: #fff;
//   display: flex;
//   flex-direction: row;
//   flex-wrap: nowrap;
//   justify-content: center;
//   align-items: center;
//   height: 136%;
// `;

// const Timertext = styled.span`
//   // width: 83px;
//   // height: 29px;
//   // font-family: EliceDigitalBaeum;
//   // font-size: 20px;
//   // line-height: 1.45;

//   // top: 47px;
//   // left: 1613px;
//   // width: 69px;
//   // height: 24px;
//   // text-align: left;
//   // font-style: normal;
//   // font-variant: normal;
//   // font-weight: normal;
//   // font-size: 20px;
//   // line-height: 24px;
//   // font-family: Pretendard;
//   // letter-spacing: 0px;
//   // color: #ffffff;
//   // opacity: 1;
// `;

// const Timertime = styled.span`
//   // width: 260px;
//   // height: 30px;
//   // // font-family: Barlow;
//   // font-size: 25px;
//   // line-height: 1.2;

//   text-align: left;
//   font-style: normal;
//   font-variant: normal;
//   font-weight: normal;
//   font-size: 20px;
//   line-height: 24px;
//   font-family: Pretendard;
//   letter-spacing: 0px;
//   color: #ffffff;
//   opacity: 1;
// `;

// const Title = styled.div`
//   grid-area: title;
//   position: relative;
//   display: flex;
//   flex-direction: row;
//   flex-wrap: nowrap;
//   justify-content: center;
//   align-items: flex-end;
// `;
// const Titletext = styled.div`
//   width: 500px;
//   font-family: KIMM_B;
//   font-size: 40px;
//   font-weight: bold;
//   font-stretch: normal;
//   font-style: normal;
//   line-height: 1.05;
//   letter-spacing: normal;
//   text-align: center;
//   color: #fff;
//   cursor: pointer;
// `;

// const Logo = styled.img`
//   height: 30px;
//   width: 190px;
//   background-size: 100% 100%;
//   background-repeat: no-repeat;
// `;

// const Titleimg = styled.img`
//   // width: 967px;
//   // height: 27px;
//   // background-repeat: no-repeat;
//   // background-size: 100% 100%;
//   // position: absolute;
//   // bottom: -34px;

//   top: 44px;
//   left: 40px;
//   width: 286px;
//   height: 31px;
//   /* UI Properties */
//   opacity: 1;
// `;

// const Login = styled.div`
//   grid-area: login;
//   position: relative;
//   top: 15px;
//   display: flex;
//   flex-direction: row;
//   flex-wrap: nowrap;
//   justify-content: flex-end;
//   align-items: center;
//   height: 100%;
// `;

const LoginBtn = styled.div`
  // width: 120px;
  // height: 30px;
  // border-radius: 15px;
  // border: solid 1px #688397;
  // background-color: rgba(101, 183, 255, 0.35);
  // display: flex;
  // flex-direction: row;
  // flex-wrap: nowrap;
  // justify-content: center;
  // align-items: center;
  // cursor: pointer;
  // text-shadow: 0 0 6px #5cafff;
  // font-weight: normal;
  // font-stretch: normal;
  // font-style: normal;
  // letter-spacing: normal;
  // text-align: center;
  // color: #b4dffa;
  // margin: 0 35px 0 0;

  // top: 40px;
  // left: 1254px;
  // width: 153px;
  // height: 39px;
  position: absolute;
  top 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;

  background: #ffffff33 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 10px #00000033;
  border: 1px solid #9fa3a9;
  border-radius: 8px;
  opacity: 1;

  &.EMS {
    top: 40px;
    left: 1254px;
    width: 153px;
    height: 39px;
  }
  &.PMS {
    top: 40px;
    left: 1427px;
    width: 153px;
    height: 39px;
  }

  // &.invisible {
  //   visibility: hidden;
  // }
`;
const LoginText = styled.span`
  // padding: 0 0 3px 10px;
  // font-family: EliceDigitalBaeum;
  // font-size: 15px;
  // line-height: 1.4;

  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  &.EMS {
    // top: 48px;
    // left: 1310px;
    // width: 41px;
    // height: 24px;
    // z-index: 10;

    display: flex;
    justify-content: center;
    align-items: center;

    text-align: left;
    font-style: normal;
    font-variant: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 24px;
    font-family: Pretendard;
    letter-spacing: 0px;
    color: #ffffff;
    opacity: 1;
  }
  &.PMS {
    // top: 48px;
    // left: 1482px;
    // width: 42px;
    // height: 24px;

    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    font-style: normal;
    font-variant: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 24px;
    font-family: Pretendard;
    letter-spacing: 0px;
    color: #ffffff;
    opacity: 1;
  }
`;

const JisLogo = styled.div`
  position: absolute;
  top: 44px;
  left: 40px;
  width: 288px;
  height: 34px;
  /* UI Properties */
  background: transparent url(${jis_logo}) 0% 0% no-repeat padding-box;
  opacity: 1;
`;

const CurrentTime = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  white-space: nowrap;

  &.Timertext {
    top: 47px;
    left: 1613px;
    width: 69px;
    height: 24px;
    text-align: left;
    font-style: normal;
    font-variant: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 24px;
    font-family: Pretendard;
    letter-spacing: 0px;
    color: #ffffff;
    opacity: 1;
  }

  &.Timertime {
    top: 47px;
    left: 1692px;
    width: 188px;
    height: 24px;
    text-align: left;
    font-style: normal;
    font-variant: normal;
    font-weight: normal;
    font-size: 20px;
    line-height: 24px;
    font-family: Pretendard;
    letter-spacing: 0px;
    color: #ffffff;
    opacity: 1;
    margin-left: 10px;
  }
`;

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

function Header() {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  return (
    <Headerdiv>
      {/* <Titleimg src={jis_logo} alt="(주)주인정보시스템"></Titleimg> */}
      <JisLogo alt="(주)주인정보시스템"></JisLogo>
      <LoginBtn className="EMS" onClick={() => navigate("/EMS")}>
        <LoginText className="EMS">EMS</LoginText>
      </LoginBtn>
      <LoginBtn className="PMS" onClick={() => navigate("/PMS")}>
        <LoginText className="PMS">PMS</LoginText>
      </LoginBtn>
      <CurrentTime className="Timertext">현재시간</CurrentTime>
      <CurrentTime className="Timertime">{formatDate(currentTime)}</CurrentTime>
    </Headerdiv>
  );
}

export default Header;
