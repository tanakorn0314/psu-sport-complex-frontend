import React from 'react';
import { connect } from 'react-redux';
import Modal from '../components/responsiveModal';
import PubSub from 'pubsub-js';
import ModalAction from '../redux/modal/actions';

export default ComposedComponent => {
    class withModal extends React.Component {

        componentDidMount() {
            this.token = PubSub.subscribe('hideModal', () => {
                this.props.hideModal();
            });
        }

        componentWillUnmount() {
            PubSub.unsubscribe(this.token);
        }

        render() {
            const {
                visible,
                title,
                body,
                footer,
                cancel,
                toggle,
                style
            } = this.props;
            return (
                <div>
                    <ComposedComponent {...this.props} />
                    <Modal
                        bodyStyle={style}
                        onCancel={cancel}
                        visible={visible}
                        toggle={toggle}
                        title={title}
                        footer={footer}
                    >
                        {body}
                    </Modal>
                </div>
            )
        }

    }

    return connect(state => state.Modal, ModalAction)(withModal);
}