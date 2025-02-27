// logo
import logo from "../img/logo.png";

import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Headerdiv = styled.div`
  width: 100%;
  max-height: 100px;
  position: fixed; // 스크롤 시 헤더가 따라서 내려오게 position 설정
  top: 44px;
  z-index: 999; // header가 항상 화면구성에서 맨 위여야 함 => z-index 설정 높임
  display: grid;
  align-content: center;
  grid-template-columns: 25% 58% 17%;
  grid-auto-flow: dense;
  grid-template-areas: "title login timer";
  // margin-top: 44px;
`;
const Timer = styled.div`
  grid-area: timer;
  position: relative;
  text-align: left;
  display: flex;
  flex-direction: row;
  // white-space: nowrap;
  justify-content: flex-end;
  align-items: center;
  right:40px;
`; 

const Timertext = styled.span`
  width: 80px;
  height: 24px;
  text-align: left;
  font: normal normal 20px/24px Pretendard;
  letter-spacing: 0;
  color: #FFFFFF;
  opacity: 1;
  margin:10px;
`;

const Timertime = styled.span`
  width: 188px;
  height: 24px;
  text-align: left;
  font: normal normal normal 20px/24px Pretendard;
  letter-spacing: 0px;
  color: #FFFFFF;
  opacity: 1;
`;

const Title = styled.div`
  height: 34px;
  grid-area: title;
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  // justify-content: center;
  align-items: flex-end;
  left:40px;
`;

const Logo = styled.img`
  height: 34px;
  width: 288px;
  background-size: 0% 0%;
  background-repeat: no-repeat;
  cursor : pointer;
`;

const Login = styled.div`
  grid-area: login;
  position: relative;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
`;

const LoginBtn = styled.div`
  width: 153px;
  height: 39px;
  border: 1px solid var(---9fa3a9);
  background: #FFFFFF33 0% 0% no-repeat padding-box;
  box-shadow: 0px 3px 10px #00000033;
  border: 1px solid #9FA3A9;
  border-radius: 8px;
  opacity: 1;
  // border-radius: 15px;
  // border: solid 1px #688397;
  // background-color: rgba(101, 183, 255, 0.35);
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  // text-shadow: 0 0 6px #5cafff;
  // font-weight: normal;
  // font-stretch: normal;
  // font-style: normal;
  // letter-spacing: normal;
  // text-align: center;
  // color: #b4dffa;
  margin: 0 20px 0 0;
  &.invisible {
    visibility: hidden;
  }
`;
const LoginText = styled.span`
  text-align: left;
  font: normal normal normal 20px/24px Pretendard;
  letter-spacing: 0px;
  color: #FFFFFF;
  opacity: 1;
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
      <Timer>
        <Timertext>현재시간</Timertext>
        <Timertime>{formatDate(currentTime)}</Timertime>
      </Timer>
      <Title>
        <Logo src={logo}  alt="logo" onClick={() => navigate("/")} />
      </Title>

      <Login>
        {/* <LoginBtn onClick={() => navigate("/")}>
      <LoginText>Home</LoginText>
    </LoginBtn> */}
        <LoginBtn onClick={() => navigate("/EMS")}>
          <LoginText>전력피크분석</LoginText>
        </LoginBtn>
        <LoginBtn onClick={() => navigate("/PMS")}>
          <LoginText>설비정밀진단</LoginText>
        </LoginBtn>
      </Login>
    </Headerdiv>
  );
}

export default Header;
