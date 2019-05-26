import React from 'react';
import {
  Card,
  Table,
  Button,
  Icon,
  Modal,
  Row,
  Col,
  notification
} from 'antd';
import DatePicker from '../../../components/datePicker';
import Input from '../../../components/input';
import Highlighter from 'react-highlight-words';
import moment from 'moment';
import { connect } from 'react-redux';
import UsersAction from '../../../redux/users/actions';

const { dispatcher } = UsersAction;

class UserList extends React.Component {

  state = {
    searchText: '',
    modal: {
      body: '',
      isOpen: false
    },
    selectedId: 0,
    startDate: moment(),
    endDate: moment().add('month', 1),
    amount: 500
  }

  componentDidMount() {
    this.props.fetchAllUsers();
  }

  render() {
    const { modal } = this.state;
    const users = this.props.Users.users;
    const column = [{
      title: '#',
      dataIndex: 'no',
      key: 'no',
    }, {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      ...this.getColumnSearchProps('name')
    }, {
      title: 'Phone Number / PSU Passport',
      dataIndex: 'userId',
      key: 'userId',
      ...this.getColumnSearchProps('userId')
    }, {
      title: 'Position',
      dataIndex: 'position',
      key: 'position',
      ...this.getColumnSearchProps('position')
    }, {
      title: 'Member expires',
      dataIndex: 'expires',
      key: 'expires',
      render: data => {
        const { id, position, end } = data;
        if (position === 'member')
          return <a href='#'>{moment(end).format('LLL')}</a>
        if (position === 'general public')
          return (<Button id={id} onClick={this.handleSelectUser}>To member</Button>)
        return "-";
      }
    }];
    const data = users.map((user, index) => ({
      no: index + 1,
      key: index,
      name: user && `${user.fname} ${user.lname}`,
      userId: user && user.psuPassport && user.psuPassport.length > 0 ? user.psuPassport : user.phoneNumber,
      position: user && user.position,
      expires: user && { id: user.userId, position: user.position, end: user.memberEnd },
    }))

    return (
      <Card style={this.props.style}>
        <Table
          bordered
          columns={column}
          dataSource={data}
        />
        <Modal
          visible={modal.isOpen}
          toggle={this.toggle}
          title='To member'
          onCancel={this.hideModal}
          footer={[
            <Button type="primary" onClick={this.confirmMember}>Confirm</Button>,
            <Button type="secondary" onClick={this.hideModal}>Cancel</Button>
          ]}
        >
          {modal.body}
        </Modal>
      </Card>
    )
  }

  getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys, selectedKeys, confirm, clearFilters,
    }) => (
        <div style={{ padding: 8 }}>
          <Input
            ref={node => { this.searchInput = node; }}
            placeholder={`Search ${dataIndex}`}
            value={selectedKeys[0]}
            onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
            onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
            style={{ width: 188, marginBottom: 8, display: 'block' }}
          />
          <Button
            type="primary"
            onClick={() => this.handleSearch(selectedKeys, confirm)}
            icon="search"
            size="small"
            style={{ width: 90, marginRight: 8 }}
          >
            Search
            </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
            </Button>
        </div>
      ),
    filterIcon: filtered => <Icon type="search" style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) => record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
    render: (text) => (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[this.state.searchText]}
        autoEscape
        textToHighlight={text && text.toString()}
      />
    ),
  })

  renderModal = () => {
    const { startDate, endDate, amount } = this.state;
    return (
      <div>
        <Row gutter={12} style={{ marginBottom: 5 }}>
          <Col span={12}>
            <h4>Start Date</h4>
            <DatePicker
              style={{ width: '100%' }}
              value={startDate}
              onChange={this.handleSelectStart}
            />
          </Col>
          <Col span={12}>
            <h4>End Date</h4>
            <DatePicker
              style={{ width: '100%' }}
              value={endDate}
              onChange={this.handleSelectEnd}
            />
          </Col>
        </Row>
        <h4>Amount</h4>
        <Input
          style={{ width: '100%' }}
          name='amount'
          value={amount}
          defaultValue={this.state.amount}
          onChange={this.handleChange} />
      </div>
    )
  }

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  }

  handleSelectUser = e => {
    const { id } = e.target;
    this.setState({ selectedId: id });
    this.showModal();
  }

  showModal = () => {
    const { modal } = this.state;
    modal.isOpen = true;
    modal.body = this.renderModal();
    this.setState({ modal });
  }

  hideModal = () => {
    const { modal } = this.state;
    modal.isOpen = false;
    this.setState({
      modal,
      startDate: moment(),
      endDate: moment().add('month', 1),
      amount: 500
    });
  }

  toggle = () => {
    const { modal } = this.state;
    modal.isOpen = !modal.isOpen;
    this.setState({ modal });
  }

  handleSelectStart = startDate => {
    this.setState({ startDate })
  }

  handleSelectEnd = endDate => {
    this.setState({ endDate })
  }

  handleChange = e => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  }

  confirmMember = async () => {
    const {
      selectedId,
      startDate,
      endDate,
      amount
    } = this.state;

    const data = {
      startDate,
      endDate,
      amount
    }

    const result = await this.props.toMember(selectedId, data);

    if (result.error) {
      notification['error']({
        message: 'Error',
        description: result.error,
        duration: 3
      })
    } else {
      notification['success']({
        message: 'Success',
        description: 'Upgrade user successful',
        duration: 3
      });
      this.hideModal();
    }
  }
}

export default connect(state => state, dispatcher)(UserList);