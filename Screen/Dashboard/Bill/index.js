import React from 'react';
import StyledWrapper from './style';
import { connect } from 'react-redux';
import BillAction from '../../../redux/bill/actions';
import BillingList from '../../../containers/billingList';

class Bill extends React.Component {

    render() {
        return (
            <StyledWrapper>
                <BillingList/>
            </StyledWrapper>
        )
    }
}

export default connect(state => state, BillAction)(Bill);