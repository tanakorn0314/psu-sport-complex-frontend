import React from 'react';
import { connect } from 'react-redux';
import ScreenAction from '../redux/screen/actions';
import enquire from 'enquire-js';
import { Spin, Icon } from 'antd';

export default ComposedComponent => {
    class withEnquireScreen extends React.Component {

        constructor(props) {
            super(props);
            this.props.startLoad();
        }

        componentDidMount() {
            enquire.register(`screen and (max-width:575px)`, {
                match: () => {
                    this.props.setMobileScreen(true);
                },
                unmatch: () => {
                    this.props.setMobileScreen(false);
                }
            })
            this.props.endLoad();
        }

        componentWillUnmount() {
            enquire.unregister(`screen and (max-width:575px)`)
        }

        render() {
            const antIcon = <Icon type="loading-3-quarters" style={{ fontSize: 24 }} spin />;
            return (
                <div>
                    {this.props.isLoading && <Spin indicator={antIcon} style={{
                        position: 'fixed',
                        right: 20,
                        top: 80,
                        zIndex: 100
                    }} />}
                    <ComposedComponent {...this.props} />
                </div>

            )
        }

    }

    return connect(state => state.Screen, ScreenAction)(withEnquireScreen);
}