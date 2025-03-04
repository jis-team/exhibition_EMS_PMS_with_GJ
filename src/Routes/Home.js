import imgbackground from "../img/home_background_1.png";

import styled from "styled-components";

import Header from "../Component/Header";

// const HomeWrapper = styled.div`
//   // display: inline-block;
//   position: fixed;
//   // position: center;
//   // width: 100%;
//   background: linear-gradient(#466d89, #041527);
//   // min-height: 100vh;
//   min-height: 100vh;
//   overflow: hidden;
// `;
const HomeWrapper = styled.div`
  background: linear-gradient(#466d89, #041527);
  width: 100vw;
  height: 100vh;
  min-height: 911px;
  text-align: center;
  overflow: hidden;
  user-select: none;
`;

const ImgBackground = styled.img`
  // background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: 0;
  &.background {
    // position: absolute;
    // position: relative;
    // top: 0;
    // right: 0;
    width: 100vw;
    // aspect-ratio: 1920 / 711;
    height: 100vh;
  }
`;

const Headerclass = styled.div`
  // position: relative;
  // height: 90px;
  // max-width: 1920px;
  // margin: auto;
`;

const BodyContent = styled.div`
  // position: relative; /* ✅ 배경보다 위에 배치 */
  // position: absolute; /* ✅ 배경보다 위에 배치 */
  z-index: 1;
  text-align: center;
  // padding: 20px;
  background: None;
`;

const BodyText = styled.div`
  // position: relative; /* ✅ 배경 이미지보다 높은 z-index 적용 */
  position: absolute; /* ✅ 배경 이미지보다 높은 z-index 적용 */
  z-index: 1; /* ✅ 배경보다 위에 배치 */
  color: white; /* ✅ 가독성을 위해 글자색 변경 */

  top: 50%; /* 수직 중앙 */
  left: 50%; /* 수평 중앙 */
  transform: translate(-50%, -50%); /* 정확한 중앙 정렬 */

  font-size: 40px;
  font-weight: bold;
  text-align: center;
  width: 600px;
  background: None;
  // padding: 20px;
`;

const TextSet = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  // width : 800px;
  // height: 150px;
  // max-width: 600px;
  // max-height : 600px;
`;

function Home() {
  return (
    <HomeWrapper>
      <Headerclass>
        <Header />
      </Headerclass>
      <ImgBackground className="background" src={imgbackground}></ImgBackground>
      <BodyContent className="App">
        <TextSet>
          <BodyText className="App-header">
            더 쉽고 편리하게 안정적인 <br />
            자동화 솔루션으로 <br /> 고객과 함께 합니다.
          </BodyText>
        </TextSet>
      </BodyContent>
    </HomeWrapper>
  );
}

export default Home;
