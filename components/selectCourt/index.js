import React from 'react';
import { Label } from '../typo';
import Select, { SelectOption } from '../select';
import _ from 'lodash';

class SelectCourt extends React.Component {
    render() {
        const value = this.props.value || 1;
        const defaultValue = this.props.defaultValue || 1;
        const numCourt = this.props.numCourt || 1;

        return (
            <div style={this.props.style} className={this.props.className}>
                <div style={{ marginBottom: 3 }}>
                    <Label htmlFor='court' msg='court' />
                </div>
                <Select id='court'
                    value={value}
                    defaultValue={defaultValue}
                    onChange={this.handleChange}
                >
                    {
                        _.range(1, numCourt + 1).map((num) => (
                            <SelectOption key={num} value={num}>{num}</SelectOption>
                        ))
                    }
                </Select>
            </div>
        )
    }

    handleChange = (id) => {
        console.log(id);
        this.props.onChange && this.props.onChange(id);
    }
}

export default SelectCourt;