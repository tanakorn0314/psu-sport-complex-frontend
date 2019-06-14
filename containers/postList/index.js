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
import Link from 'next/link';

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
                title: t('title'),
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
        console.log(data.content);
        this.copyToClipboard(data.content);
        this.props.onEdit && this.props.onEdit(data);
    }

    copyToClipboard = (message) => {
        const div = document.createElement('div');
        div.innerHTML = message;
        document.body.appendChild(div);
        div.focus();
        document.execCommand('copy');
        div.remove()
        // const textField = document.createElement('textarea')
        // textField.innerHTML = message
        // document.body.appendChild(textField)
        // textField.select()
        // document.execCommand('copy')
        // textField.remove()
    }
}

export default connect(
    state => state,
    { ...NewsAction, ...ModalAction }
)(withNamespaces('common')(PostList));