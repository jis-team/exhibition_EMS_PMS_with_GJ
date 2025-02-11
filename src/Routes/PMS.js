import Header from "../Component/Header";
import styled from "styled-components";
import PumpMoterLeft from "../Component/PumpMoterLeft";
import PumpMoterMiddle from "../Component/PumpMoterMiddle";
import {useState,useCallback} from "react";

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
    width: 500px;
    text-shadow: 0 0 6px #5cafff;
    // font-family: EliceDigitalBaeum-Bd;
    text-shadow: 0 0 3px #000;
    font-size: 30px;
    line-height: 1.47;
`


function PMS(){
    const [parentData,setParentData] = useState("1");

    const testfunction = useCallback((data) => {
        setParentData((prev)=>(prev !== data ? data:prev));
    },[])
   
    return(
        <Wrapper>
            <Headerclass>
                <Header />
            </Headerclass>
            <PmsWrapper>
                <Titleset>
                    <TitletSetText>펌프 및 모터 - 정밀진단</TitletSetText>
                </Titleset>
                <PumpMoterLeft pumpnum={parentData} setPumpNum={testfunction}/>
                <PumpMoterMiddle pumpnum={parentData} setPumpNum={testfunction}/>
            </PmsWrapper>
        </Wrapper>
        
        
    )

}
export default PMS;