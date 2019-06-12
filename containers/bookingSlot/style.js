import styled from 'styled-components';
import colors from '../../styles/colors';
import { SLOT_STATES } from './slotState';


const selectTitleColor = (props) => {
    const { slotState } = props;
    switch (slotState) {
        case SLOT_STATES.APPROVED: return colors.approved;
        case SLOT_STATES.BOOKED: return colors.booked;
        case SLOT_STATES.PASSED: return colors.passed;
        default: return colors.light2
    }
}

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
    background-color: ${selectTitleColor};
    ${props => props.slotState === SLOT_STATES.PASSED && 
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
    color: ${colors.main2};
    ${props => props.selected && `
        background-color: ${colors.selected};
        color: ${colors.light1};
    `}
`


export {
SlotTitle,
Slot,
SlotInfo,
}