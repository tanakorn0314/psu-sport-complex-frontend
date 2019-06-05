import React from 'react';
import StyledWrapper, { StyledItem } from './style';

export class Menu extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedKey: props.selectedKey
        }
    }

    componentWillReceiveProps(nextProps) {
        const { selectedKey } = this.state;
        if (selectedKey !== nextProps.selectedKey)
            this.setState({ selectedKey: nextProps.selectedKey });
    }

    render() {
        const { children } = this.props;

        let display = [];

        children.forEach((child, idx) => {
            if (!child || typeof child !== 'object')
                return null;
            if (Array.isArray(child)) {
                const items = child.map((c, idx) => this.renderItem(c, idx + display.length + 1));
                display = [...display, ...items];
            } else {
                display = [...display, this.renderItem(child, display.length + 1)];
            }
        });

        return (
            <StyledWrapper {...this.props}>
                {display}
            </StyledWrapper>
        )
    }

    renderItem = (child, idx) => {
        const { mode } = this.props;
        const { selectedKey } = this.state;
        const selected = child.props.name === selectedKey;
        return <MenuItem {...child.props} key={idx} mode={mode} onClick={this.handleSelect} selected={selected} />
    }

    handleSelect = (name) => {
        this.setState({ selectedKey: name });

        this.props.onChange && this.props.onChange(name);
    }

}

export class MenuItem extends React.Component {
    render() {
        const { name, noHighlight } = this.props;
        const n = noHighlight ? null : name;
        return (
            <StyledItem {...this.props} onClick={() => this.handleClick(n)} />
        )
    }

    handleClick = name => {
        this.props.onClick && this.props.onClick(name);
    }
}