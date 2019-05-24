import styled from 'styled-components';
import { colors } from '../../styles/constants/colors';

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
background-color: ${colors.available};
${props => props.isPassed && 
    `background-color: #ddd;`
}
${props => props.booked && 
    `background-color: ${colors.selected};`
}
${props => props.approved && 
    `background-color: ${colors.approved};`
}
${props => props.selected && 
    `border-bottom: 1px solid #555;`
}
`;

const SlotInfo = styled.div`
display: flex;
justify-content: center;
align-items: center;
padding: 3px;
text-align: center;
min-height: 50px;
height: 100%;
${props => props.selected && 
    `background-color: #555;
    color: #fff;`
}
`


export {
SlotTitle,
Slot,
SlotInfo,
}