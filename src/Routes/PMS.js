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

const PmsWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 1920px;
  max-height: 1080px;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(3, 955px 20px 945px);
  grid-template-rows: repeat(3, 10% 1% 89%);
  grid-auto-flow: dense;
  grid-template-areas:
    "title-set title-set title-set"
    ". . ."
    "left . right";
`

function PMS(){
    return(
        <Wrapper>
            <Headerclass>
                <Header />
            </Headerclass>
            <PmsWrapper>

                <h1>PMS</h1>
                <h2>hello world1</h2>
            </PmsWrapper>
            
        </Wrapper>
        
        
    )

}
export default PMS;