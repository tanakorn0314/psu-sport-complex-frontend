import React from 'react';
import { Button } from 'antd';
import { TextButton } from '../typo';
import PubSub from 'pubsub-js';

const TIMEOUT = 500;

class LoadingButton extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false
        }
    }

    componentDidMount() {
        this.token = PubSub.subscribe('done', () => {
            this.setState({isLoading: false});
        })
    }

    componentWillUnmount() {
        PubSub.unsubscribe(this.token);
    }

    componentWillReceiveProps(nextProps) {
        const { loading } = nextProps;
        if (!loading) {
            this.setState({isLoading: false})
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
            onClick(e);
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