import React from 'react';
import { Input } from 'antd';

class Inpt extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: props.value ? props.value : 0
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            value: nextProps.value ? nextProps.value : 0
        })
    }

    render() {
        const { value } = this.state;
        return <Input
                    name={this.props.name}
                    style={this.props.style}
                    value={value}
                    defaultValue={value}
                    onChange={this.handleChange}
                />
    }

    handleChange = e => {
        this.setState({value: e.target.value})
        this.props.onChange && this.props.onChange(e);
    }
}

export default Inpt;