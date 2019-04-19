import React from 'react';
import StyleWrapper from './style';
import {
    Row,
    Col,
    Button
} from 'antd';

class BottomAction extends React.Component {

    render() {
        const { visible, fee } = this.props;
        return (
            visible && 
            <StyleWrapper>
                <Col s={16} md={16} lg={16} xl={16} xxl={16}>
                    <h1 className='total'>Total : {fee} baht</h1>
                </Col>
                <Col className='confirm' s={8} md={8} lg={8} xl={8} xxl={8}>
                    <Button onClick={this.handleClick}>Confirm</Button>
                </Col>
            </StyleWrapper>
        )
    }

    handleClick = () => {
        this.props.onClick && this.props.onClick(this.state.bookingList)
    }
}

export default BottomAction;