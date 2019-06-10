import styled from 'styled-components';

const StyledWrapper = styled.div`  
    padding: 0 10px;
    background-color: white;
    .title {
        padding: 10px 0;
    }
    .title-side {
        width: 5px;
        height: 10px;
        background-color: #000;
    }
    .row {
        display: flex;
        flex-wrap: wrap;
        .sport-item-list {
            width: 30%;
            display: flex;
            justify-content: center;
            align-items: center;
        }   
        .stadium-rate {
            width: 70%;
        } 

        @media (max-width: 575px) {
            .sport-item-list, .stadium-rate {
                width: 100%;
            }
        }
    }
    
    @media (max-width: 575px) {
        padding: 5px 0;
        .title {
            text-align: center;
        }
    }
`;

export default StyledWrapper;