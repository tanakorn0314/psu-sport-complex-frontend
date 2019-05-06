import styled from 'styled-components';

const StyledWrapper = styled.div`
    border: solid 1px #cecece;
    width: 100%;
    padding: 20px;
    border-radius: 5px;

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