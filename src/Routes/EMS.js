import PowerPeakLeft from "../Component/PowerPeakLeft";
import PowerPeakRight from "../Component/PowerPeakRight";
import Header from "../Component/Header";
import styled from "styled-components";
 //img
 import bg from "../img/bg.png"

const Wrapper = styled.div`
  // width: 100%;
  // min-height: 100vh;
  // overflow-x: hidden;
  // position: relative;
  background-size: cover;
  background-position: center;
  background-image: url(${bg});
  // background: transparent url(${bg}) 100% 100% no-repeat padding-box;
  width: 100vw;
  height: 100vh;
  min-height: 1080px;
  text-align: center;
  overflow: hidden;
  user-select: none;
`;

const Headerclass = styled.div`
  //   position: absolute;
  height: 90px;
  max-width: 1920px;
  margin: auto;
`;

const EmsWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 1920px;
  max-height: 1080px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(3, 940px 10px 940px);
  grid-template-rows: repeat(2, 11% 89%);
  grid-auto-flow: dense;
  grid-template-areas:
    "title-set title-set title-set"
    "left . right";
`;

const Titleset = styled.div`
  grid-area: title-set;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-around;
  position:relative;
  left:40px;
`;

const TitletSetText = styled.span`
  text-align: left;
  font: normal normal bold 40px/48px Pretendard;
  letter-spacing: 0px;
  color: #FFFFFF;
  opacity: 1;
  // width: 583px;
  // height: 48px;
  
`;

function EMS() {
  return (
    <Wrapper>
      <Headerclass>
        <Header />
      </Headerclass>
      <EmsWrapper>
        <Titleset>
          <TitletSetText>통계 및 전력피크관리 - 전력피크 분석</TitletSetText>
        </Titleset>
        <PowerPeakLeft />
        <PowerPeakRight />
      </EmsWrapper>
    </Wrapper>
  );
}
export default EMS;
