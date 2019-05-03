import styled from 'styled-components';

export const DateSelctContainer = styled.div`
    display: flex;
    width: 100%;
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
        width: 40%;
        max-width: 80px;
    }
`;

export const TimeSelectContainer = styled.div`
    display: flex;
    width: 100%;
    .ant-select {
        min-width: 40px;
        &:first-child {
            margin-right: 10px;
        }
        &:last-child {
            margin-left: 10px;
        }
    }
`;