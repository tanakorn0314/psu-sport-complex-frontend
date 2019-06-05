import React from 'react';
import {
  Card,
  Table,
  Icon,
} from 'antd';
import Button from '../../components/button';
import Input from '../../components/input';
import Highlighter from 'react-highlight-words';
import moment from 'moment';
import { connect } from 'react-redux';
import UserAction from '../../redux/users/actions';
import ModalAction from '../../redux/modal/actions';
import text, { locale } from '../../common/text';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import { TextButton, Text, H2 } from '../../components/typo';

class UserList extends React.Component {

  state = {
    searchText: '',
  }

  componentDidMount() {
    this.props.fetchAllUsers();
  }

  render() {
    const users = this.props.Users.users;
    const column = [{
      title: '#',
      dataIndex: 'no',
      key: 'no',
    }, {
      title: text['name'],
      dataIndex: 'name',
      key: 'name',
      ...this.getColumnSearchProps('name')
    }, {
      title: text['phoneNumberOrPSUPassport'],
      dataIndex: 'userId',
      key: 'userId',
      ...this.getColumnSearchProps('userId')
    }, {
      title: text['position'],
      dataIndex: 'position',
      key: 'position',
      ...this.getColumnSearchProps('position')
    }, {
      title: text['memberExpires'],
      dataIndex: 'expires',
      key: 'expires',
      render: data => {
        const { id, position, end } = data;
        if (position === 'member')
          return <Text style={{color: colors.main3}}>{moment(end).locale(locale).format('DD MMM YYYY HH:mm')}</Text>
        if (position === 'generalPublic')
          return (<Button id={id} onClick={this.handleSelectUser}><TextButton msg='toMember' /></Button>)
        return "-";
      }
    }];

    const data = users.map((user, index) => ({
      no: index + 1,
      key: index,
      name: user && `${user.fname} ${user.lname}`,
      userId: user && user.psuPassport && user.psuPassport.length > 0 ? user.psuPassport : user.phoneNumber,
      position: user && text[user.position],
      expires: user && { id: user.userId, position: user.position, end: user.memberEnd },
    }))

    return (
      <Card style={this.props.style}>
        <H2 msg='userList' style={{marginBottom: 5}}/>
        <Table
          bordered
          columns={column}
          dataSource={data}
          style={{ fontFamily: fonts.psuStidti }}
        />
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
            placeholder={text['search']}
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
            {text['search']}
          </Button>
          <Button
            onClick={() => this.handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            {text['reset']}
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
    this.props.showConfirmMemberModal(id);
  }

}

export default connect(state => state, { ...UserAction, ...ModalAction })(UserList);