import React from 'react';
import {
    Row,
    Col,
    Checkbox
} from 'antd';
import { Label, H3 } from '../../components/typo';
import { withNamespaces } from '../../i18n';
import Input from '../../components/input';
import Select, { SelectOption } from '../../components/select';
import _ from 'lodash';
import TimeAmount from '../../components/timeAmount';
import CostStadium from '../../components/costStadium';

const MAX_COURT = 20;

class EditStadiumForm extends React.Component {

    render() {
        const { t, responsive } = this.props;
        const { name, openAfter, closeBefore, numCourt, costPublic, costMember, costStaff, costStudent, canBook } = this.props;

        const lg = responsive ? 12 : 24;

        return (
            <div style={this.props.style}>
                <Row>
                    <Col md={24} lg={lg}>
                        <div style={{ marginBottom: 5, marginTop: 5 }}>
                            <Label htmlFor='name' msg='stadiumName' />
                        </div>
                        <Input id='name' placeholder={t('stadiumName')}
                            value={name}
                            style={{ maxWidth: 300 }}
                            onChange={(e) => { this.handleChange('name', e.target.value) }}
                        />
                        <div style={{ marginBottom: 5, marginTop: 5 }}>
                            <Label htmlFor='numCourt' msg='numCourt' />
                        </div>
                        <Select id='numCourt'
                            value={numCourt}
                            onChange={(val) => { this.handleChange('numCourt', val) }}
                        >
                            {
                                _.range(1, MAX_COURT).map((num) => (
                                    <SelectOption key={num} value={num}>{num}</SelectOption>
                                ))
                            }
                        </Select>
                        <table>
                            <tbody>
                                <TimeAmount label='openAfter' value={openAfter}
                                    onChange={(value) => { this.handleChange('openAfter', value) }}
                                />
                                <TimeAmount label='closeBefore' value={closeBefore}
                                    onChange={(value) => { this.handleChange('closeBefore', value) }}
                                />
                            </tbody>
                        </table>
                    </Col>
                    <Col md={24} lg={lg}>
                        <div style={{ marginBottom: 5, marginTop: 5 }}>
                            <H3 msg='serviceFee' />
                        </div>
                        <table>
                            <tbody>
                                <CostStadium position='generalPublic' value={costPublic}
                                    onChange={(e) => { this.handleChange('costPublic', e.target.value) }}
                                />
                                <CostStadium position='member' value={costMember}
                                    onChange={(e) => { this.handleChange('costMember', e.target.value) }}
                                />
                                <CostStadium position='staff' value={costStaff}
                                    onChange={(e) => { this.handleChange('costStaff', e.target.value) }}
                                />
                                <CostStadium position='student' value={costStudent}
                                    onChange={(e) => { this.handleChange('costStudent', e.target.value) }}
                                />
                            </tbody>
                        </table>
                    </Col>
                </Row>
                <div style={{ marginBottom: 5, marginTop: 5 }}>
                    <Checkbox style={{ marginRight: 5 }} checked={canBook} value={canBook}
                        onChange={(e) => { this.handleChange('canBook', !e.target.value) }}
                    />
                    <Label msg='canBook' />
                </div>
            </div>
        )
    }

    extractValue = (val) => {
        const [hour, minute] = val.split(':');
        return [
            +hour,
            +minute
        ]
    }

    handleChange = (key, value) => {
        this.props.onChange && this.props.onChange(key, value);
    }

}

export default withNamespaces('common')(EditStadiumForm)