import React from 'react';
import { connect } from 'react-redux';
import ScreenAction from '../redux/screen/actions';
import enquire from 'enquire-js';

const { dispatcher } = ScreenAction;

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
            return (
                <ComposedComponent {...this.props}/>
            )
        }

    }

    return connect(state => state.Screen, dispatcher)(withEnquireScreen);
}