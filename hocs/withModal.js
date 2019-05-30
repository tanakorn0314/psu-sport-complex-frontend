import React from 'react';
import { connect } from 'react-redux';
import { Modal } from 'antd';

export default ComposedComponent => {
    class withModal extends React.Component {

        render() {
            const {
                visible,
                title,
                body,
                footer,
                action,
                cancel,
                toggle,
                actionText,
                cancelText,
            } = this.props;
            return (
                <div>
                    <ComposedComponent {...this.props} />
                    <Modal
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

    return connect(state => state.Modal)(withModal);
}