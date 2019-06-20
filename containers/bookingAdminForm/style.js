import styled from 'styled-components';

const StyledWrapper = styled.div`

    .input-stadium {
        display: flex;
        flex-wrap: wrap;
        .select-stadium {
            width: 80%;
            max-width: 310px;
            padding-right: 10px;
        }
        .select-court {
            flex: 1
        }
    }
    .space-vertical {
        margin: 3px 0;
    }
`;

export default StyledWrapper;