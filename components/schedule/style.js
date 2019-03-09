import styled from 'styled-components';
import { colors } from '../../styles/constants/colors';

const unitHeight = 40;
const timeSlot = 13;

const ScheduleWrapper = styled.div`
    min-width: 500px;
    position: relative;
    margin-bottom: 20px;
    padding: 10px;
    border: solid 1px ${colors.border};
    border-radius: 10px;
    .top-container {
        display: flex;
        justify-content: space-between;
    }
    .schedule {
        border: solid 1px ${colors.border};
        display: flex;
        flex-direction: column;
        height: 300px;
    }
    .schedule-top {
        display: flex;
        min-height: ${unitHeight}px;
        margin-right: 17px
        border-bottom: solid 1px ${colors.border};
    }
    .schedule-top-item {
        text-align: center;
        color: #788195;
        padding: 7px 3px;
        font-size: 11px;
        text-overflow: ellipsis;
        flex: 1;
        border-left: solid 1px ${colors.border};
    }
    .schedule-left {
        width: 50px;
        border-left: none !important;
    }
    .schedule-content {
        position: relative;
        display: flex;
        overflow-y: auto;
    }
    .schedule-content-column {
        position: relative;
        display: flex;
        flex: 1;
        flex-direction: column;
        border-left: solid 1px ${colors.border};
        height: ${unitHeight * timeSlot}px;
    }
    .schedule-content-row-item {
        position: relative;
        text-align: center;
        color: #788195;
        padding: 7px 3px;
        font-size: 11px;
        text-overflow: ellipsis;
        border-bottom: solid 1px ${colors.border};
        flex: 1;
        min-height: ${unitHeight}px;
    }
    .schedule-content-event {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
    }
    .schedule-event {
        background-color: red;
        position: absolute;
        left: 0;
        right: 0;
        top: 40px;
        height: 40px;
    }
    // li {
    //     list-style: none;
    // }
    // ul {
    //     padding: 0;
    //     margin: 0;
    // }
    // a {
    //     text-decoration: none;
    // }
    // .timeline {
    //     display: block;
    //     position: absolute;
    //     top: 0;
    //     left: 0;
    //     height: 100 %;
    //     width: 100 %;
    //     padding - top: ${ unitHeight} px;
    // }
    // .timeline > ul > li {
    //     position: relative;
    //     height: ${ unitHeight} px;
    // }
    // .timeline > ul > li > span {
    //     position: relative;
    //     top: -10px;
    // }
    // .timeline > ul > li :: after {
    //     content: '';
    //     position: absolute;
    //     bottom: 0px;
    //     left: 60px;
    //     height: 1px;
    //     width: calc(100 % - 60px);
    //     background - color: #eaeaea;
    //     box - sizing: border - box;
    // }
    // .events {
    //     position: relative;
    //     margin-left: 60px;
    //     z-index: 1;
    //     float: left;
    //     width: calc(100 % - 60px);
    // }
`;

const Event = styled.div`
    backgroud-color: red;
    background-color: red;
    position: absolute;
    left: 0;
    right: 0;
    top: ${props => props.start * unitHeight}px;
    height: ${props => props.length * unitHeight}px;
`;

export {
    ScheduleWrapper,
    Event
};