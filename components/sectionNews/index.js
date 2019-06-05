import React from 'react';
import StyledWrapper from './style';
import PostBox from '../postBox';
import img from '../../static/image/stadium/fitness.jpg';
import { Row, Col, Pagination } from 'antd';
import _ from 'lodash';

const title = `
    ม.อ.ประชุมหารือวางแผน MOU กับ บริษัท MIRAPRO Co., Ltd. “เน้นได้ฝึกงานจริงกับ
`;

const content = `
    มหาวิทยาลัยสงขลานครินทร์ นำโดยผู้ช่วยศาสตราจารย์ ดร. นิวัติ แก้วประดับ อธิการบดีมหาวิทยาลัยสงขลานครินทร์ รอง
`;

const PAGE_SIZE = 3;

class SectionNews extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            current: 1
        }

        this.data = _.range(0, 57).map((num) => ({img, title: `${num} ${title}`, content}));

    }

    render() {
        const { current } = this.state;
        const dataList = this.data;
        const len = dataList.length;

        const start = (current - 1) * PAGE_SIZE;
        const end = start + PAGE_SIZE;

        const display = dataList.slice(start, end);

        return (
            <StyledWrapper>
                <h1>Sport Complex Today</h1>
                <h3>The lastest news from sport complex</h3>
                <Row gutter={8}>
                    {
                        display.map((data, index) => (
                            <Col key={index} xs={24} sm={24} md={8}>
                                <PostBox
                                    img={data.img}
                                    title={data.title}
                                    content={data.content}
                                />
                            </Col>
                        ))
                    }
                </Row>
                <div className='paginateContainer'>
                    <Pagination size='small' total={len} pageSize={PAGE_SIZE} onChange={this.handleChangePage} />
                </div>
            </StyledWrapper>
        )
    }

    handleChangePage = (current) => {
        const dataList = this.data;
        const len = dataList.length;

        const currentIdx = current * PAGE_SIZE;

        //reach end
        if (currentIdx >= len)
            console.log('end');

        this.setState({current});
    }
}

export default SectionNews;