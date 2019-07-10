import styled from 'styled-components';
import { List } from 'antd';

const StyledWrapper = styled.div`

`

export const CourtDetailRow = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    justify-content: space-between;
`
export const StyledList = styled(List)`
   
    ul.ant-list-items {
        padding-left: 0;
    }

`

export const StyledListItem = styled(List.Item)`
    padding: 0;
`

export default StyledWrapper;