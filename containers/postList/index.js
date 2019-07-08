import React from 'react';
import { connect } from 'react-redux';
import ModalAction from '../../redux/modal/actions';
import NewsAction from '../../redux/news/actions';
import { Card, Divider } from 'antd';
import Table from '../../components/table';
import { H2, TextLink } from '../../components/typo';
import colors from '../../styles/colors';
import { withNamespaces, i18n } from '../../i18n';
import moment from 'moment';
import { Link } from '../../i18n';

class PostList extends React.Component {

    componentDidMount() {
        this.props.fetchNewsFeed();
    }

    render() {
        const { t } = this.props;
        const locale = i18n.language || 'en';
        const { newsList } = this.props.News;
        const column = [
            {
                title: '#',
                dataIndex: 'no',
                key: 'no',
                align: 'center'
            },
            {
                title: t('postTitle'),
                dataIndex: 'title',
                key: 'title',
                width: 400,
                render: (title, data) => {
                    return (
                        <Link href={`/news?newsId=${data.id}`}>
                            <a target='_blank'>
                                <TextLink style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}>{title}</TextLink>
                            </a>
                        </Link>
                    )
                }
            },
            {
                title: t('date'),
                dataIndex: 'date',
                key: 'date',
                align: 'center'
            },
            {
                title: t('action'),
                key: 'action',
                dataIndex: 'id',
                align: 'center',
                render: (id, data) => (
                    <div id={id}>
                        <Link href='#post'>
                            <TextLink id={id} style={{ color: colors.main3 }} onClick={() => this.edit(newsList[data.no - 1])} msg='edit' />
                        </Link>
                        <Divider type='vertical' />
                        <TextLink id={id} style={{ color: colors.main3 }} onClick={this.handleDelete} msg='delete' />
                    </div>
                )
            }
        ];
        const dataSource = newsList.map((news, index) => ({
            key: index,
            id: news.newsId,
            no: index + 1,
            title: t(news.title),
            date: moment(news.createdAt).locale(locale).format('DD MMM YYYY HH:mm')
        }))

        return (
            <Card style={this.props.style} id={this.props.id}>
                <H2 msg='postList' />
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
        this.props.showConfirmModal('deleteNews', 'areYouSureToDeleteNews', () => {
            this.props.deleteNews(+id);
            this.props.hideModal();
        });
    }

    edit = (data) => {
        this.props.onEdit && this.props.onEdit(data);
    }

}

export default connect(
    state => state,
    { ...NewsAction, ...ModalAction }
)(withNamespaces('common')(PostList));