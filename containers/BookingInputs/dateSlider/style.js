import styled from 'styled-components';

const StyledWrapper = styled.div`
    display: flex;
    margin: 10px 0;
    .slider-container {
        position: relative;
        overflow-x: hidden;
        overflow-y: hidden;
        width: 100%;
        .slider {
            display: flex;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            overflow-x: scroll;
        }
    }
    .date-box {
        text-align: center;
        padding: 10px;
        border: solid 1px #cecece;
        border-right: 0;
        box-sizing: border-box;
        &:first-child {
            border-left: 0;
        }
        .box {
            width: 120px;
            box-sizing: border-box;
        }
    }
    .arrow {
        position: relative;
        padding: 10px;
        border: solid 1px #cecece;
        &:first-child {
            border-radius: 3px 0 0 3px;
        }
        &:last-child {
            border-radius: 0 3px 3px 0;
        }
    }
`;

export default StyledWrapper;