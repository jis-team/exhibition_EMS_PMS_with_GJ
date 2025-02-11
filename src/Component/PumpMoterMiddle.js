import styled from "styled-components";


const PmsConponentMiddle =styled.div`
    grid-area: middle;
    position: relative;
    height: 635.5px;
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
function PumpMoterMiddle(props){
    
    return(
        <PmsConponentMiddle>
            <LoginBtn onClick={()=>props.setPumpNum("1")}><span>1</span></LoginBtn>
            <LoginBtn onClick={()=>props.setPumpNum("2")}><span>2</span></LoginBtn>
            <LoginBtn onClick={()=>props.setPumpNum("3")}><span>3</span></LoginBtn>
            <LoginBtn onClick={()=>props.setPumpNum("4")}><span>4</span></LoginBtn>
            <LoginBtn onClick={()=>props.setPumpNum("5")}><span>5</span></LoginBtn>
            <LoginBtn onClick={()=>props.setPumpNum("6")}><span>6</span></LoginBtn>
            <LoginBtn onClick={()=>props.setPumpNum("7")}><span>7</span></LoginBtn>
            <LoginBtn onClick={()=>props.setPumpNum("8")}><span>8</span></LoginBtn>
        </PmsConponentMiddle>
        
    )

}
export default PumpMoterMiddle;