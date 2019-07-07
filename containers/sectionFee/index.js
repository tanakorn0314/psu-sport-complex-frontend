import React from 'react';
import { connect } from 'react-redux';
import { Row, Col, Carousel } from 'antd';
import StyledWrapper from './style';
import SportItemList from '../../components/sportItemList';
import StadiumRate from '../../components/stadiumRate';
import { H1 } from '../../components/typo';

class SectionFee extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0,
            isLoading: true
        }
    }

    componentDidMount() {
        this.setState({isLoading: false})
    }

    render() {
        const { selectedIndex, isLoading } = this.state;
        const { isMobile } = this.props.Screen;
        const stadiums = this.props.Stadium.stadiums || [];
        const mode = isMobile ? 'horizontal' : 'vertical';
        const displayCount = isMobile ? 4 : 6;
        return (
            <StyledWrapper>
                <H1 className='title' msg='serviceRate' />
                {!isLoading &&
                    <div className='row'>
                        <div className='sport-item-list'>
                            <SportItemList
                                selectedKey={selectedIndex}
                                stadiums={stadiums}
                                mode={mode}
                                onSelect={this.handleSelect}
                                pageSize={displayCount}
                            />
                        </div>
                        <div className='stadium-rate'>
                            <Carousel
                                autoplay
                                ref={slider => { this.slider = slider }}
                                beforeChange={this.handleBeforeChange}
                                dots={false}
                            >
                                {this.renderStadiums()}
                            </Carousel>
                        </div>
                    </div>
                }
            </StyledWrapper>
        )
    }

    renderStadiums = () => {
        const stadiums = this.props.Stadium.stadiums || [];
        return stadiums.map((stadium, index) => {
            return (
                <StadiumRate key={index} stadium={stadium} />
            )
        })
    }

    handleSelect = (index) => {
        this.setState({ selectedIndex: index })
        this.slider.slick.slickGoTo(index);
    }

    handleBeforeChange = (current, next) => {
        this.setState({ selectedIndex: next });
    }
}

export default connect(state => state)(SectionFee);