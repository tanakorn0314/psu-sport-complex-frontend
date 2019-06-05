import React from 'react';
import StyledWrapper from './style';
import UserList from '../../../containers/userList';

class Users extends React.Component {

    render() {
        return (
            <StyledWrapper>
                <UserList />
            </StyledWrapper>
        )
    }
}

export default Users;