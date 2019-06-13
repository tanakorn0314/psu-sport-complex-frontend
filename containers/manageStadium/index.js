import React from 'react';
import { connect } from 'react-redux';
import ModalAction from '../../redux/modal/actions';
import StadiumAction from '../../redux/stadium/actions';
import { Card, Divider } from 'antd';
import Table from '../../components/table';
import { H2, TextLink } from '../../components/typo';
import Tag from '../../components/tag';
import colors from '../../styles/colors';
import { withNamespaces } from '../../i18n';

class ManageStadium extends React.Component {

    componentDidMount() {
        this.props.fetchStadium();
    }

    render() {
        const { t } = this.props;
        const { stadiums } = this.props.Stadium;
        const column = [
            {
                title: '#',
                dataIndex: 'no',
                key: 'no',
            },
            {
                title: t('stadiumName'),
                dataIndex: 'stadiumName',
                key: 'stadiumName',
            },
            {
                title: t('numCourt'),
                dataIndex: 'numCourt',
                key: 'numCourt',
            },
            {
                title: t('canBook'),
                dataIndex: 'canBook',
                key: 'canBook',
                render: (canBook) => {
                    const color = canBook ? 'green' : 'red';
                    const msg = canBook ? 'yes' : 'no';
                    return (
                        <Tag color={color}>{t(msg)}</Tag>
                    )
                }
            },
            {
                title: t('action'),
                key: 'action',
                dataIndex: 'id',
                render: (id) => (
                    <div id={id}>
                        <TextLink id={id} style={{ color: colors.main3 }} onClick={() => this.showDetail(stadiums[id-1])} msg='detail' />
                        <Divider type='vertical' />
                        <TextLink id={id} style={{ color: colors.main3 }} onClick={this.handleDelete} msg='delete' />
                    </div>
                )
            }
        ];
        const dataSource = stadiums.map((stadium, index) => ({
            key: index,
            id: stadium.stadiumId,
            no: index + 1,
            stadiumName: t(stadium.name),
            numCourt: stadium.numCourt,
            canBook: stadium.canBook
        }))

        return (
            <Card style={this.props.style}>
                <H2 msg='manageStadium' />
                <Table
                    columns={column}
                    dataSource={dataSource}
                    pagination={{ pageSize: 10 }}
                />
            </Card>
        )
    }

    handleDelete = async (e) => {
        const { id } = e.target;
        this.props.showConfirmModal('deleteStadium', 'areYouSureToDeleteStadium', () => {
            this.props.deleteStadium(+id);
            this.props.hideModal();
        });
    }

    showDetail = (data) => {
        this.props.showStadiumDetailModal(data);
    }
}

export default connect(
    state => state,
    { ...StadiumAction, ...ModalAction }
)(withNamespaces('common')(ManageStadium));