import styled from 'styled-components';

const StyleWrapper = styled.div`
    width: 100%;
    .schedule-wrapper {
        margin-bottom: 10px;
        .events {
            margin-bottom: 5px;
        .date {
            margin: 0 20px;
        }

        .events-row {
            display: flex;
            overflow-x: scroll;
            padding: 0 5%;
        }
    }}
`;

const Event = styled.div`
    flex-shrink: 0;
    width: 40%;
    max-width: 160px;
    min-width: 120px;
    height: 60px;
    margin-right: 10px;
    padding: .25em;
    border-radius: 5px;
    background-color: ${props => props.color || '#cecece'};
    text-overflow: ellipsis;
            
`

export default StyleWrapper;
export {
    Event
}