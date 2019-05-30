import { Button } from 'antd';


const actions = {
  SHOW_MODAL: 'SHOW_MODAL',
  HIDE_MODAL: 'HIDE_MODAL',
  showChangeSchedule: (body, action) => (dispatch, getState) => {
    const modal = {
      title: 'Change Schedule',
      body: body,
      footer: ModalFooter({
        func: action,
        text: 'OK'
      }, {
        func: () => {},
        text: 'Cancel'
      }),
      action: action,
      cancel: () => { },
      toggle: () => { },
      actionText: 'OK',
      cancelText: 'Cancel',
    }

    dispatch({type: actions.SHOW_MODAL, modal});
  }
};

const ModalFooter = (action, cancel) => (
  <Button key={0} type="primary" onClick={action.func}>{action.text}</Button>,
  <Button key={1} type="secondary" onClick={cancel.func}>{cancel.text}</Button>
)

export default actions;
