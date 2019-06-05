import React from 'react';
import PubSub from 'pubsub-js';
import text from '../../common/text';
import { H2, Text } from '../../components/typo';
import Button from '../../components/button';

import AuthTabs from '../../containers/authTabs';
import ConfirmBooking from '../../containers/confirmBooking';
import BookByAdmin from '../../containers/bookingAdmin';
import EditBooking from '../../containers/editBooking';
import ConfirmMember from '../../containers/confirmMember';
import BlackoutDetail from '../../components/blackoutDetail';
import Confirm from '../../components/confirm';

const actions = {
  SHOW_MODAL: 'SHOW_MODAL',
  HIDE_MODAL: 'HIDE_MODAL',
  TOGGLE_MODAL: 'TOGGLE_MODAL',
  showAuthModal: () => (dispatch, getState) => {
    const modal = {
      title: <H2 msg='authentication' />,
      body: renderAuth(),
      footer: null,
      cancel: () => dispatch(actions.hideModal()),
      toggle: () => dispatch(actions.hideModal()),
    }

    dispatch({ type: actions.SHOW_MODAL, modal });
  },
  showConfirmModal: (dataSource) => (dispatch) => {
    const action = () => { PubSub.publish('confirmBooking') };
    const cancel = () => { PubSub.publish('cancelBooking') };

    const modal = {
      title: <H2 msg='confirmBooking' />,
      body: renderConfirmBooking(dataSource),
      footer: renderFooter(action, cancel, text['confirm'], text['cancel']),
      cancel: cancel,
      toggle: cancel,
    }

    dispatch({ type: actions.SHOW_MODAL, modal });
  },
  showBookByAdminModal: () => (dispatch) => {
    const action = () => { PubSub.publish('bookByAdmin') };
    const cancel = () => dispatch(actions.hideModal());

    const modal = {
      title: <H2 msg='confirmBooking' />,
      body: renderBookByAdmin(),
      footer: renderFooter(action, cancel, text['confirm'], text['cancel']),
      cancel: cancel,
      toggle: cancel,
    }

    dispatch({ type: actions.SHOW_MODAL, modal });
  },
  showEditBookingModal: (booking) => (dispatch) => {
    const action = () => { PubSub.publish('editBooking') };
    const cancel = () => dispatch(actions.hideModal());

    const modal = {
      title: <H2 msg='editBooking' />,
      body: renderEditBooking(booking),
      footer: renderFooter(action, cancel, text['confirm'], text['cancel']),
      cancel: cancel,
      toggle: cancel,
    }

    dispatch({ type: actions.SHOW_MODAL, modal });
  },
  showConfirmMemberModal: (selectedId) => (dispatch) => {
    const action = () => { PubSub.publish('confirmMember') };
    const cancel = () => dispatch(actions.hideModal());

    const modal = {
      title: <H2 msg='confirmMember' />,
      body: renderConfirmMember(selectedId),
      footer: renderFooter(action, cancel, text['confirm'], text['cancel']),
      cancel: cancel,
      toggle: cancel,
    }

    dispatch({ type: actions.SHOW_MODAL, modal });
  },
  showBlackoutDetailModal: (dataSource) => (dispatch) => {
    const action = () => dispatch(actions.hideModal());
    const cancel = () => dispatch(actions.hideModal());

    const modal = {
      title: <H2 msg='blackoutDetail' />,
      body: renderBlackoutDetail(dataSource),
      footer: renderOKFooter(action, text['ok']),
      cancel: cancel,
      toggle: cancel,
    }

    dispatch({ type: actions.SHOW_MODAL, modal });
  },
  showConfirmModal: (title, msg, action) => (dispatch) => {
    const cancel = () => dispatch(actions.hideModal());

    const modal = {
      title: <H2 msg={title} />,
      body: renderConfirm(msg),
      footer: renderFooter(action, cancel, text['yes'], text['no']),
      cancel: cancel,
      toggle: cancel,
    }

    dispatch({ type: actions.SHOW_MODAL, modal });
  },
  showTransactionErrorModal: () => (dispatch) => {
    const cancel = () => dispatch(actions.hideModal());

    const modal = {
      title: <H2 msg='error' />,
      body: <Text msg='transactinoNotFoundDetail' />,
      footer: renderFooter(cancel, 'ok'),
      cancel: cancel,
      toggle: cancel,
    }

    dispatch({ type: actions.SHOW_MODAL, modal });
  },
  showRefreshModal: (detail, route) => (dispatch) => {
    const cancel = () => dispatch(actions.hideModal());

    const modal = {
      title: <H2 msg='error' />,
      body: <Text msg={detail} />,
      footer: renderRefreshFooter(route),
      cancel: cancel,
      toggle: cancel,
    }

    dispatch({ type: actions.SHOW_MODAL, modal });
  },
  hideModal: () => (dispatch) => {
    dispatch({ type: actions.HIDE_MODAL })
  },
  toggleModal: () => (dispatch) => {
    dispatch({ type: actions.TOGGLE_MODAL })
  }
};

const renderFooter = (action, cancel, actionText, cancelText) => (
  <div>
    <Button key={0} type="primary" onClick={action} loading>{actionText}</Button>
    <Button key={1} type="secondary" onClick={cancel} loading>{cancelText}</Button>
  </div>
)

const renderRefreshFooter = (route) => (
  <a href={route}>
    <Button type="primary">{text['reload']}</Button>
  </a>
)

const renderOKFooter = (action, actionText) => (
  <div>
    <Button key={0} type="primary" onClick={action} loading>{actionText}</Button>
  </div>
)

const renderAuth = () => (<AuthTabs />);
const renderConfirm = (msg) => (<Confirm msg={msg}/>)
const renderConfirmBooking = (dataSource) => (<ConfirmBooking dataSource={dataSource} />)
const renderBookByAdmin = () => (<BookByAdmin />)
const renderEditBooking = (booking) => (<EditBooking booking={booking} />)
const renderConfirmMember = (selectedId) => (<ConfirmMember selectedId={selectedId} />)
const renderBlackoutDetail = (dataSource) => (<BlackoutDetail dataSource={dataSource}/>)

export default actions;
