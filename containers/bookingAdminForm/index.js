import React from 'react';
import {
    Row,
    Col,
    Checkbox
} from 'antd';
import { connect } from 'react-redux';
import { Label, H3 } from '../../components/typo';
import { withNamespaces } from '../../i18n';
import Input from '../../components/input';
import Select, { SelectOption } from '../../components/select';
import _ from 'lodash';
import StyledWrapper from './style';
import moment from 'moment';
import SelectPosition from '../../components/selectPosition';
import SelectStadium from '../../components/selectStadium';
import SelectCourt from '../../components/selectCourt';
import InputDateTime from '../../components/inputDateTime';

class BookingAdminForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            stadiumId: 1
        }
    }

    render() {
        let { t, responsive, Stadium, startTime, endTime, courtId } = this.props;
        const { stadiumId } = this.state;

        const { stadiums } = Stadium;
        const selectedStadium = stadiums.find(s => s.stadiumId === stadiumId)

        const lg = responsive ? 12 : 24;

        return (
            <StyledWrapper style={this.props.style}>
                <Row>
                    <Col md={24} lg={lg}>
                        <div className='input-stadium'>
                            <SelectStadium
                                className='select-stadium'
                                stadiums={stadiums}
                                onChange={(id) => { this.handleSelectStadium(id) }}
                            />
                            <SelectCourt
                                value={courtId}
                                className='select-court'
                                numCourt={selectedStadium.numCourt}
                                onChange={(courtId) => { this.handleChange('courtId', courtId) }}
                            />
                        </div>
                        <div className='space-vertical'>
                            <Label htmlFor='startTime' msg='startTime' />
                        </div>
                        <InputDateTime value={startTime} onChange={(date) => this.handleChange('startTime', date)} />
                        <div className='space-vertical'>
                            <Label htmlFor='endTime' msg='endTime' />
                        </div>
                        <InputDateTime value={endTime} onChange={(date) => this.handleChange('endTime', date)} />
                    </Col>
                    <Col md={24} lg={lg}>
                        <div className='space-vertical'>
                            <Label htmlFor='owerName' msg='ownerName' />
                        </div>
                        <Input id='owerName' placeholder={t('ownerName')}
                            style={{ maxWidth: 300 }}
                            onChange={(e) => { this.handleChange('owerName', e.target.value) }}
                        />
                        <div className='space-vertical'>
                            <Label htmlFor='ownerInfo' msg='ownerInformation' />
                        </div>
                        <Input id='ownerInfo' placeholder={t('ownerInformation')}
                            style={{ maxWidth: 300 }}
                            onChange={(e) => { this.handleChange('ownerInfo', e.target.value) }}
                        />
                        <div className='space-vertical'>
                            <Label htmlFor='ownerPosition' msg='ownerType' />
                        </div>
                        <SelectPosition id='ownerPosition' placeholder={t('ownerType')}
                            style={{ maxWidth: 300 }}
                            onChange={(position) => { this.handleChange('ownerPosition', position) }}
                        />
                    </Col>
                </Row>
            </StyledWrapper>
        )
    }

    handleSelectStadium = (stadiumId) => {
        const { courtId } = this.props;
        const { stadiums } = this.props.Stadium;
        const selectedStadium = stadiums.find(s => s.stadiumId === stadiumId)

        this.setState({ stadiumId });
        this.handleChange('stadiumId', stadiumId);

        if (selectedStadium.numCourt <= courtId)
            this.handleChange('courtId', selectedStadium.numCourt);
    }

    handleChange = (key, value) => {
        this.props.onChange && this.props.onChange(key, value);
    }

    createTimeObj = (time) => {
        const mTime = moment(time);
        return {
            minute: mTime.minute(),
            hour: mTime.hour(),
            date: mTime.date(),
            month: mTime.month(),
            year: mTime.year(),
        }
    }

}

export default withNamespaces('common')(connect(state => state)(BookingAdminForm))