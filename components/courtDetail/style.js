import styled from 'styled-components';

const StyledWrapper = styled.div`
    padding: 5px;

    .courtNumContainer {
        display: flex;
        flex-direction: row;

        .durationContainer {
            display: flex;
            flex: 1;
            flex-direction: row;
            flex-wrap: wrap;

            padding: 0 10px;
        }
    }

`;

export default StyledWrapper;