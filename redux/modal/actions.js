import React from 'react';
import { Button } from 'antd';
import EditBookingTime from '../../containers/EditBookingTime';
import PubSub from 'pubsub-js';

const actions = {
  SHOW_MODAL: 'SHOW_MODAL',
  HIDE_MODAL: 'HIDE_MODAL',
  TOGGLE_MODAL: 'TOGGLE_MODAL',
  modalChangeSchedule: (booking) => (dispatch, getState) => {
    const modal = {
      title: 'Change Schedule',
      body: renderChangeTime(booking),
      footer: renderFooter(() => PubSub.publish('confirm-edit'), () => dispatch(actions.hideModal()), 'Confirm', 'Cancel'),
      action: publish('confirm-edit'),
      cancel: () => dispatch(actions.hideModal()),
      toggle: () => dispatch(actions.hideModal()),
      actionText: 'Confirm',
      cancelText: 'Cancel',
    }

    dispatch({ type: actions.SHOW_MODAL, modal });
  },
  hideModal: () => (dispatch) => {
    console.log('hide modal')
    dispatch({ type: actions.HIDE_MODAL })
  },
  toggleModal: () => (dispatch) => {
    console.log('toggle modal')
    dispatch({ type: actions.TOGGLE_MODAL })
  }
};

const publish = (msg, data) => {
  return () => { PubSub.publish(msg, data) };
}

const renderFooter = (action, cancel, actionText, cancelText) => (
  <div>
      <Button key={0} type="primary" onClick={action}>{actionText}</Button>
      <Button key={1} type="secondary" onClick={cancel}>{cancelText}</Button>
  </div>
)

const renderChangeTime = (booking) => (
    <EditBookingTime booking={booking} />
)

export default actions;
