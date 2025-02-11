// logo
import logo from '../juin_logo_.jpg';
// import logo from '../kwater.png';
import logo_down_img from '../header_title_down.png'

import React from "react";
import {useState,useEffect} from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Headerdiv = styled.div`
  width: 100%;
  max-height: 100px;
  position: fixed; // 스크롤 시 헤더가 따라서 내려오게 position 설정
  top: 0;
  z-index: 999; // header가 항상 화면구성에서 맨 위여야 함 => z-index 설정 높임
  display: grid;
  align-content: center;
  grid-template-columns: 25% 50% 25%;
  grid-auto-flow: dense;
  grid-template-areas:
    "timer title login";
  margin-top: 20px;
`;
const Timer = styled.div`
  grid-area: timer;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  letter-spacing: normal;
  text-align: left;
  color: #fff;
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
  height: 136%;
`;

const Timertext = styled.span`
  width: 83px;
  height: 29px;
  font-family: EliceDigitalBaeum;
  font-size: 20px;
  line-height: 1.45;
`;

const Timertime = styled.span`
  width: 260px;
  height: 30px;
  // font-family: Barlow;
  font-size: 25px;
  line-height: 1.2;
`;

const Title = styled.div`
grid-area: title;
position: relative;
display: flex;
flex-direction: row;
flex-wrap: nowrap;
justify-content: center;
align-items: flex-end;
`;
const Titletext = styled.div`
  width: 500px;
  font-family: KIMM_B;
  font-size: 40px;
  font-weight: bold;
  font-stretch: normal;
  font-style: normal;
  line-height: 1.05;
  letter-spacing: normal;
  text-align: center;
  color: #fff;
  cursor: pointer;
`;

const Logo = styled.img`
  height: 30px;
  width: 190px;
  background-size: 100% 100%;
  background-repeat: no-repeat;
`;

const Titleimg = styled.img`
  width: 967px;
  height: 27px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  bottom: -34px;
`;

const Login = styled.div`
  grid-area: login;
      position: relative;
      top: 15px;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-end;
      align-items: center;
      height: 100%;
`;

const LoginBtn = styled.div`
    width: 120px;
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
    color: #b4dffa;
    margin: 0 35px 0 0;
    &.invisible {
      visibility: hidden;
    }
`
const LoginText = styled.span`
    padding: 0 0 3px 10px;
    font-family: EliceDigitalBaeum;
    font-size: 15px;
    line-height: 1.4;
`


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
      setCurrentTime(new Date())
    },1000)

    return () => clearInterval(interval);
  },[]);
  return (
  <Headerdiv>
    <Timer>
      <Timertext>현재시간 </Timertext>
      <Timertime>{formatDate(currentTime)}</Timertime>  
    </Timer>
    <Title >
      <Logo src={logo} alt="logo" />
      <Titletext onClick={() => navigate("/")}>AI기반 스마트 정수장</Titletext>
      <Titleimg src={logo_down_img} alt="logo"></Titleimg>
    </Title>
    
    <Login>
    {/* <LoginBtn onClick={() => navigate("/")}>
      <LoginText>Home</LoginText>
    </LoginBtn> */}
    <LoginBtn onClick={() => navigate("/EMS")}>
      <LoginText>EMS</LoginText>
    </LoginBtn>
    <LoginBtn onClick={() => navigate("/PMS")}>
      <LoginText>PMS</LoginText>
    </LoginBtn>
    </Login>
  </Headerdiv>
    
  );
}

export default Header;