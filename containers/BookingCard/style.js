import styled from 'styled-components';
import { Row } from 'antd';
import { colors } from '../../styles/constants/colors';

const StyledRow = styled(Row)`
    border: solid 1px #cecece;
    border-bottom: 0;
    width: 100%;
    padding: 20px;
    background-color: #fff;
    @media (max-width: 325px) {
        padding: 5px;
    }
    &:first-child {
        border-radius: 5px 5px 0 0;
    }
    &:last-child {
        border-radius: 0 0 5px 5px;
        border-bottom: solid 1px #cecece;
    }
    
    .duration {
        display: flex;
        .line-container {
            display: flex;
            flex: 1;
            padding: 0 16px;
            justify-content: center;
            align-items: center;
            .line {
                flex: 1;
                width: 100%;
                height: 1.2px;
                background-color: #cecece;
            }
        }
    }

    .slot-container {
        display: flex;
        padding: 10px;
    }

    .check {
        width: 20px;
        height: 20px;
        position: absolute;
        right: 5px;
        bottom: 5px;
        color: ${colors.available};
        font-size: 20px;
    }
`;

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

const Badge = styled.div`
    width: 20px;
    height: 20px;
    position: absolute;
    right: 5px;
    bottom: 5px;
`

export default StyledRow;

export {
    SlotTitle,
    Slot,
    SlotInfo,
    Badge
}