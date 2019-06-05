import React from 'react';
import { Button } from 'antd';
import { TextButton } from '../typo';

class LoadingButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        }
    }

    render() {
        const { isLoading } = this.state;
        const loading = isLoading && this.props.loading
        if (this.props.msg)
        return (
            <Button {...this.props} onClick={this.handleClick} loading={loading}>
                <TextButton msg={this.props.msg}/>
            </Button>
        )
        return (
            <Button {...this.props} onClick={this.handleClick} loading={loading}/>
        )
    }

    handleClick = async (e) => {
        this.preventDefault(e);
        
        await this.setState({isLoading: true});

        const { onClick } = this.props;
        if (onClick)
            await onClick(e);

        await this.setState({isLoading: false});
    }

    preventDefault = (e) => {
        const { onClick } = this.props;
        
        if (onClick) {
            e.persist();
            e.preventDefault();
        }
    }


}

export default LoadingButton;