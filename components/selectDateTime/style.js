import styled from 'styled-components';

export const DateSelctContainer = styled.div`
    display: flex;
    width: 80%;
    margin-bottom: 10px;
    .ant-select {
        &:first-child {
            margin-right: 10px;
        }
        &:last-child {
            margin-left: 10px;
        }
    }
    .select-month {
        width: 50%;
        min-width: 100px;
        max-width: 120px;
    }
    .select-year {
        width: 25%;
        min-width: 76px;
        max-width: 120px;
    }
    .select-day {
        width: 15%;
        min-width: 64px;
        max-width: 120px;
    }
`;

export const TimeSelectContainer = styled.div`
    display: flex;
    width: 100%;
    .ant-select {
        min-width: 64px;
        &:first-child {
            margin-right: 10px;
        }
        &:last-child {
            margin-left: 10px;
        }
    }
    .select-hour, .select-minute {
        width: 15%;
        min-width: 64px;
        max-width: 120px;
    }
`;