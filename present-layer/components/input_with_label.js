import React from 'react';

class InputWithLabel extends React.Component {
    render() {
        const props = this.props;
        return (
            <div className='container'>
                <div>{props.label}</div>
                <input className='input' type={props.type} name={props.name} onChange={this.handleChange} />
                <style jsx>{`
                    .container {
                        display: flex;
                        flex: 1;
                        flex-direction: column;
                    }
                    .input {
                        border: solid 1px black;
                        border-radius: 3px;
                        padding: 3px;
                        margin: 5px 5px 5px 0;
                    }
                `}</style>
            </div>
        )
    }

    handleChange = (e) => {
        if (this.props.onChange) {
            this.props.onChange(e);
        }
    }
}

export default InputWithLabel;