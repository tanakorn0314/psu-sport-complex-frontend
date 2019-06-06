import React from 'react';
import StyleLayout, {
    StyledHeader as Header,
    StyledContent as Content,
    StyledFooter as Footer
} from './style';
import TopNavContent from '../../containers/topNavContent';
import { P } from '../../components/typo';
import SelectLanguage from '../../containers/selectLanguage';

class NavLayout extends React.Component {

    render() {
        return (
            <StyleLayout>
                <Header className='header'>
                    <TopNavContent/>
                </Header>
                <Content>
                    {this.props.children}
                </Content>
                {!this.props.noFooter && 
                    <Footer>
                        <P msg='footer' light={true}/>
                        <div className='option-bar'>
                            <SelectLanguage/>
                        </div>
                        
                    </Footer>
                }
            </StyleLayout>
        )
    }

}

export default NavLayout;