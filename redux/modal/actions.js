import React from 'react';
import PubSub from 'pubsub-js';
import { Router, Trans, Link } from '../../i18n';
import { H2, Text, TextButton, Normal } from '../../components/typo';
import Button from '../../components/button';

import AuthTabs from '../../containers/authTabs';
import ConfirmBooking from '../../containers/confirmBooking';
import BookByAdmin from '../../containers/bookingAdminMD';
import EditBooking from '../../containers/editBooking';
import ConfirmMember from '../../containers/confirmMember';
import BlackoutDetail from '../../components/blackoutDetail';
import Confirm from '../../components/confirm';
import EditStadium from '../../containers/editStadium';
import ManageBillMD from '../../containers/manageBillMD';
import TransactionComplete from '../../components/transactionComplete';
import fonts from '../../styles/fonts';

const actions = {
  SHOW_MODAL: 'SHOW_MODAL',
  HIDE_MODAL: 'HIDE_MODAL',
  TOGGLE_MODAL: 'TOGGLE_MODAL',
  showAuthModal: () => (dispatch) => {
    const modal = {
      title: <H2 msg='authentication' />,
      body: renderAuth(),
      footer: null,
      cancel: () => dispatch(actions.hideModal()),
      toggle: () => dispatch(actions.hideModal()),
    }

    dispatch({ type: actions.SHOW_MODAL, modal });
  },
  showBookingConfirmModal: (dataSource) => (dispatch) => {
    const action = () => { PubSub.publish('confirmBooking') };
    const cancel = () => { PubSub.publish('cancelBooking') };

    PubSub.publish('setExpiresCountDown', (dataSource.expiresAt));

    const modal = {
      title: <H2 msg='confirmBooking' />,
      body: renderConfirmBooking(dataSource),
      footer: renderFooter(action, cancel, 'confirm', 'cancel'),
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
      footer: renderFooter(action, cancel, 'confirm', 'cancel'),
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
      footer: renderFooter(action, cancel, 'confirm', 'cancel'),
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
      footer: renderFooter(action, cancel, 'confirm', 'cancel'),
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
      footer: renderOKFooter(action, 'ok'),
      cancel: cancel,
      toggle: cancel,
    }

    dispatch({ type: actions.SHOW_MODAL, modal });
  },
  showStadiumDetailModal: (dataSource) => (dispatch) => {
    const action = () => PubSub.publish('confirmEditStadium');
    const cancel = () => dispatch(actions.hideModal());

    const modal = {
      title: <H2 msg='editStadium' />,
      body: renderStadiumDetail(dataSource),
      footer: renderFooter(action, cancel, 'confirm', 'cancel'),
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
      footer: renderFooter(action, cancel, 'yes', 'no'),
      cancel: cancel,
      toggle: cancel,
    }

    dispatch({ type: actions.SHOW_MODAL, modal });
  },
  showManageBillModal: (bill) => (dispatch) => {
    const action = () => PubSub.publish('approveBill')
    const cancel = () => dispatch(actions.hideModal());

    const modal = {
      title: <H2 msg='manageBill' />,
      body: renderManageBill(bill),
      footer: renderFooter(action, cancel, 'approve', 'cancel'),
      cancel: cancel,
      toggle: cancel,
    }

    dispatch({ type: actions.SHOW_MODAL, modal });
  },
  showTransactionCompleteModal: () => (dispatch) => {
    const action = async () => {
      Router.push('/booking_history');
      dispatch(actions.hideModal());
    }
    const cancel = () => dispatch(actions.hideModal());

    const modal = {
      title: <H2 msg='confirmComplete' />,
      body: renderTransactionComplete(),
      footer: renderFooter(action, cancel, 'ok', 'close'),
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

const renderFooter = (action, cancel, actionText, cancelText) => {
  PubSub.publish('done');
  return (
    <div>
      <Button key={0} type="primary" onClick={action} loading><TextButton msg={actionText} /></Button>
      <Button key={1} type="secondary" onClick={cancel} loading><TextButton msg={cancelText} /></Button>
    </div>
  )
}

const renderRefreshFooter = (route) => {
  PubSub.publish('done');
  return (
    <a href={route}>
      <Button type="primary"><TextButton msg={'reload'} /></Button>
    </a>
  )
}

const renderOKFooter = (action, actionText) => {
  PubSub.publish('done');
  return (
    <div>
      <Button key={0} type="primary" onClick={action} ><TextButton msg={actionText} /></Button>
    </div>
  )
}

const renderAuth = () => (<AuthTabs />);
const renderConfirm = (msg) => (<Confirm msg={msg} />)
const renderConfirmBooking = (dataSource) => (<ConfirmBooking dataSource={dataSource} />)
const renderBookByAdmin = () => (<BookByAdmin />)
const renderEditBooking = (booking) => (<EditBooking booking={booking} />)
const renderConfirmMember = (selectedId) => (<ConfirmMember selectedId={selectedId} />)
const renderBlackoutDetail = (dataSource) => (<BlackoutDetail dataSource={dataSource} />)
const renderStadiumDetail = (dataSource) => (<EditStadium dataSource={dataSource} />)
const renderTransactionComplete = () => (<TransactionComplete />)
const renderManageBill = (bill) => (<ManageBillMD bill={bill} />)

export default actions;
