import React from 'react';
import StyleLayout, {
    StyledHeader as Header,
    StyledContent as Content,
    StyledFooter as Footer
} from './style';
import TopNavContent from '../../containers/topNavContent';
import { P } from '../../components/typo';
import SocialGroup from '../../components/socialGroup';
import { Row, Col } from 'antd';
import { Link } from '../../i18n';

import logo from '../../static/image/psu_brand_white.png';

class NavLayout extends React.Component {

    render() {
        return (
            <StyleLayout>
                <Header className='header'>
                    <TopNavContent />
                </Header>
                <Content>
                    {this.props.children}
                </Content>
                {!this.props.noFooter &&
                    <Footer>
                        <Row type='flex' align='middle' justify='center'>
                            <Col xs={0} sm={0} md={8}>
                                <Link href='https://www.phuket.psu.ac.th'>
                                    <a target='_blank'>
                                        <img src={logo} style={{ width: '60%', maxWidth: '150px' }} />
                                    </a>
                                </Link>

                            </Col>
                            <Col xs={24} md={8}>
                                <P msg='footer' light={true} style={{ fontSize: 20 }} />
                            </Col>
                            <Col xs={24} md={8}>
                                <SocialGroup />
                            </Col>
                        </Row>
                    </Footer>
                }
            </StyleLayout>
        )
    }

}

export default NavLayout;