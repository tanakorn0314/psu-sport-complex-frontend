import React from 'react';
import { connect } from 'react-redux';
import ScreenAction from '../redux/screen/actions';
import enquire from 'enquire-js';
import ScreenLoader from '../components/screenLoader';

export default ComposedComponent => {
    class withEnquireScreen extends React.Component {

        static async getInitialProps(ctx) {
            const pageProps = ComposedComponent.getInitialProps ? await ComposedComponent.getInitialProps(ctx) : {};
            return pageProps;
        }

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
            enquire.unregister(`screen and (max-width:575px)`);

            window.removeEventListener('scroll', () => { });

        }

        render() {
            return (
                <div>
                    {this.props.isLoading && <ScreenLoader />}
                    <ComposedComponent {...this.props} />
                </div>

            )
        }

    }

    return connect(state => state.Screen, ScreenAction)(withEnquireScreen);
}