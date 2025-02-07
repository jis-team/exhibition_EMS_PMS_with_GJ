import PowerPeakLeft from "../Component/PowerPeakLeft"
import PowerPeakRight from "../Component/PowerPeakRight"
import Header from "../Component/Header";
import styled from "styled-components";


const Wrapper = styled.div`
    // width: 100%;
    // min-height: 100vh;
    // overflow-x: hidden;
    // position: relative;
    background: linear-gradient( #466d89, #041527);
    width: 100vw;
    height: 100vh;
    min-height: 1080px;
    text-align: center;
    overflow: hidden;
    user-select: none;
`;

const Headerclass = styled.div`
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
  grid-template-rows: repeat(3, 10% 1% 89%);
  grid-auto-flow: dense;
  grid-template-areas:
    "title-set title-set title-set"
    ". . ."
    "left . right";
`

const Titleset = styled.div`
    grid-area: title-set;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
`

const TitletSetText = styled.span`
    font-family: EliceDigitalBaeum;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    color: #fff;
    width: 725px;
    text-shadow: 0 0 6px #5cafff;
    // font-family: EliceDigitalBaeum-Bd;
    text-shadow: 0 0 3px #000;
    font-size: 30px;
    line-height: 1.47;
`

function EMS(){
    return(
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
        
    )

}
export default EMS;