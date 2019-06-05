import styled from 'styled-components';
import colors from '../../styles/colors';

const Slot = styled.div`
cursor: pointer;
flex: 1;
display: flex;
flex-direction: column;
border: solid 1px #cecece;
border-right: 0;
position: relative;
&:first-child {
    border-radius: 3px 0 0 3px;
}
&:last-child {
    border-radius: 0 3px 3px 0;
    border-right: solid 1px #cecece;
}
`;

const SlotTitle = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding: 3px;
text-align: center;
border-bottom: 1px solid #cecece;
font-weight: bold;
background-color: ${colors.light2};
${props => props.isPassed && 
    `background-color: ${colors.passed};`
}
${props => props.booked && 
    `background-color: ${colors.booked};`
}
${props => props.approved && 
    `background-color: ${colors.approved};`
}
${props => props.selected && 
    `border-bottom: 1px solid ${colors.selected};`
}
`;

const SlotInfo = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 3px;
    text-align: center;
    min-height: 50px;
    height: 100%;
${props => props.selected && 
    `background-color: ${colors.selected};
    color: ${colors.light1};`
}
`


export {
SlotTitle,
Slot,
SlotInfo,
}