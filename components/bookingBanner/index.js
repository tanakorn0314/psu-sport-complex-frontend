import React from 'react';
import SelectStadium from '../selectStadium';
import DatePick from '../datePicker';
import { connect } from 'react-redux';
import Button from '../button';
import StyledWrapper, { Divider } from './style';
import moment from 'moment';
import { i18n, Router } from '../../i18n';
import { Icon } from 'antd';
import colors from '../../styles/colors';

class BookingBanner extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stadiumId: 1,
            date: moment()
        }
    }

    render() {
        const { date } = this.state;
        const { isMobile, isLoading } = this.props.Screen;
        const locale = i18n.language || 'en';
        if (isMobile)
            return <div />
        if (isLoading)
            return <Icon type="loading-3-quarters" style={{ fontSize: 24, color: colors.main1 }} spin />

        return (
            <StyledWrapper>

                <div className='col'>
                    <SelectStadium hideLabel onlyBookEnable onChange={(val) => this.handleChange('stadiumId', val)} />
                </div>
                <Divider />
                <div className='col'>
                    <DatePick value={date.locale(locale)} format='DD MMMM YYYY' onChange={(val) => this.handleChange('date', val)} />
                </div>
                <Divider />
                <div className='col'><Button msg='bookNow' type='primary' onClick={this.handleClick} loading /></div>

            </StyledWrapper>
        )
    }

    handleChange = (key, val) => {
        this.setState({ [key]: val });
    }

    handleClick = async () => {
        const { stadiumId, date } = this.state;
        const { stadiums } = this.props.Stadium;

        const d = date.format('DD-MM-YYYY');
        const sport = stadiums.find(s => s.stadiumId === stadiumId).name;

        const params = `?sport=${sport}&date=${d}`;
        await Router.push(`/booking${params}`);
    }


}

export default connect(
    state => ({ Screen: state.Screen, Stadium: state.Stadium })
)(BookingBanner);