import React from 'react';
import { Icon, Spin } from 'antd';

class ScreenLoader extends React.Component {

    state = {
        top: 72
    }

    shouldComponentUpdate(nextProps, nextState) {
        return nextState !== this.state;
    }

    render() {
        const antIcon = <Icon type="loading-3-quarters" style={{ fontSize: 24 }} spin />;
        return (
            <Spin indicator={antIcon} style={{
                position: 'fixed',
                zIndex: 300,
                right: 20,
                top: this.state.top
            }} />
        )
    }

    setLoadingPosition = () => {
        if (window.pageYOffset > 72) {
            this.setState({ top: 16 })
        }
        else {
            const top = 72 - window.pageYOffset;
            this.setState({ top })
        }
    }

    componentDidMount() {
        window.addEventListener('scroll', this.setLoadingPosition, true)
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.setLoadingPosition, true);
    }
}

export default ScreenLoader;