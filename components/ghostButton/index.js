import styled from 'styled-components';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';

const GhostButton = styled.button`
    font-family: ${fonts.psuStidti};
    cursor: pointer;
    background-color: transparent;
    border: solid 1px white;
    border-radius: 5px;
    padding: 5px 6px;
    color: white;
    transition: background-color 0.2s ease-in-out;

    :hover {
        background-color: white;
        color: ${colors.main2}
    }
`

export default GhostButton;