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
import BillAction from '../../redux/bill/actions';
import ModalAction from '../../redux/modal/actions';
import { withNamespaces, i18n } from '../../i18n';
import fonts from '../../styles/fonts';
import { H2 } from '../../components/typo';

class BillingList extends React.Component {

    state = {
        searchText: '',
    }

    componentDidMount() {
        this.props.fetchBills();
    }

    render() {
        const locale = i18n.language || 'en';
        const { t, Bill } = this.props;
        const bills = Bill.bills.filter(bill => bill.bookings[0].status === 'paid');
        const column = [{
            title: '#',
            dataIndex: 'no',
            key: 'no',
        }, {
            title: t('name'),
            dataIndex: 'name',
            key: 'name',
            ...this.getColumnSearchProps('name')
        }, {
            title: t('psuPassportOrPhoneNumber'),
            dataIndex: 'userId',
            key: 'userId',
            ...this.getColumnSearchProps('userId')
        }, {
            title: t('fee'),
            dataIndex: 'fee',
            key: 'fee',
            ...this.getColumnSearchProps('fee')
        }, {
            title: t('bookingDate'),
            dataIndex: 'createdAt',
            key: 'createdAt'
        },
        {
            title: t('action'),
            render: (item) => {
                const bill = bills[item.key]
                return <a href='#' onClick={() => {this.manageBill(bill)}}>{t('manage')}</a>
            }
        }];

        const data = bills.map((bill, index) => {
            const booking = bill.bookings[0];
            const { ownerName, ownerInfo } = booking;
            return {
                no: index + 1,
                key: index,
                name: ownerName,
                userId: ownerInfo,
                fee: bill.fee,
                createdAt: moment(bill.createdAt).locale(locale).format('DD MMM YYYY HH:mm'),
            }
        })

        return (
            <Card style={this.props.style}>
                <H2 msg='billingList' style={{ marginBottom: 5 }} />
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
                        placeholder={this.props.t('search')}
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
                        {this.props.t('search')}
                    </Button>
                    <Button
                        onClick={() => this.handleReset(clearFilters)}
                        size="small"
                        style={{ width: 90 }}
                    >
                        {this.props.t('reset')}
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

    manageBill = (bill) => {
        this.props.showManageBillModal(bill);
    }

}

export default connect(state => state, { ...BillAction, ...ModalAction })(withNamespaces('common')(BillingList));