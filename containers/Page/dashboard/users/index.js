import React from 'react';
import {connect} from 'react-redux';
import { Card } from 'antd';
import StyledWrapper from './style';
import UsersAction from '../../../../redux/users/actions';
import UserList from '../../../AdminComponents/UserList';

class Users extends React.Component {
    
    render() {
        return (
            <StyledWrapper>
                <UserList/>
            </StyledWrapper>
        )
    }
}

export default connect(state => state, UserAction)(Users);