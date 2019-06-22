import styled from 'styled-components';
import { Select } from 'antd';
import fonts from '../../styles/fonts';

export default styled(Select)`
    font-family: ${fonts.psuStidti};
    font-size: 13px;
    min-width: 62px;
    @media (max-width: 350px) {
        min-width: 52px;
    }
`

export const SelectOption = Select.Option