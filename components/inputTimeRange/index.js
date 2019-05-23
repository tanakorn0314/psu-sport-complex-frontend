import React from 'react';
import InputTime from '../inputTime';

class InputTimeRange extends React.Component {

    constructor(props) {
        super(props);
        const { start, end } = this.props;
        this.state = {
            start,
            end
        }
    }

    componentWillReceiveProps(nextProps) {
        const { start, end } = nextProps;
        this.setState({start, end})
    }

    render() {
        const { start, end, startDisabled, endDisabled } = this.props;
        return (
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <InputTime
                    style={{ display: 'flex', alignItems: 'center', width: 'unset' }}
                    value={start}
                    disabled={startDisabled}
                    onChange={this.handleChangeStart}
                />
                <div style={{ fontWeight: 'bold', marginLeft: 5, marginRight: 5 }}> - </div>
                <InputTime
                    style={{ display: 'flex', alignItems: 'center', width: 'unset' }}
                    value={end}
                    disabled={endDisabled}
                    onChange={this.handleChangeEnd}
                />
            </div>
        )
    }

    handleChangeStart = (start) => {
        const {end} = this.state;

        this.setState({start})
        this.props.onChange && this.props.onChange(start, end);
    }

    handleChangeEnd = (end) => {
        const { start } = this.state;

        this.setState({end})
        this.props.onChange && this.props.onChange(start, value);
    }
}

export default InputTimeRange;