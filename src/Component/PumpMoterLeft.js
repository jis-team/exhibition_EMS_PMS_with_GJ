import styled from "styled-components";
import { css } from "styled-components";

const Text = css`
    position: relative;
    font-family: EliceDigitalBaeum;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    letter-spacing: normal;
    text-align: left;
    color: #fff;

    &.title{
        text-shadow: 0 0 6px #5cafff;
        font-size: 20px;
        line-height: 1.8;
        padding: 0 0 0 20px;
    }
`
const PmsConponent =styled.div`
    grid-area: left;
    position: relative;
    height: 635.5px;
    display: grid;
    grid-template-rows: repeat(7, 130.5px 33.5px 130.5px 33.5px 130.5px 33.5px 130.5px);
    grid-auto-flow: dense;
    grid-template-areas:
        "one"
        "."
        "two"
        "."
        "three"
        "."
        "four";
`

const Container = styled.div`
    position: relative;
    display: grid;
    grid-template-rows: repeat(2, 28.5px 102px);
    grid-auto-flow: dense;
    grid-template-areas:
      "title"
      "graph";
    &.container_one{
        grid-area: one;
    }
`

const TitletextPMS =styled.div`
    ${Text}

`


function PumpMoterLeft(){
    return(
        <PmsConponent>
            <Container className = 'container_one'>
                <TitletextPMS>hello world</TitletextPMS>
            </Container>
            
        </PmsConponent>
        
    )

}
export default PumpMoterLeft;