import React from 'react';
import StyledWrapper from './style';
import SportItem from '../sportItem';

class SportItemList extends React.Component {

    constructor(props) {
        super(props);
        const selectedIndex = props.selectedKey || 0;
        this.state = {
            selectedIndex
        }
    }

    render() {
        const mode = this.props.mode || 'horizontal';
        return (
            <StyledWrapper mode={mode}>
                {this.renderPageItems()}
            </StyledWrapper>
        )
    }

    renderPageItems = () => {
        const { pageSize, selectedKey } = this.props;
        const selectedIndex = selectedKey || this.state.selectedIndex || 0;

        const items = this.renderItems();

        const minLen = Math.min(items.length, pageSize);
        const offset = minLen - 2;
        const start = selectedIndex >= offset ? selectedIndex - offset : 0;

        let display = [];

        for (let i = start; i < start + minLen; i++) {
            const k = i % items.length;
            display.push(items[k]);
        }

        return display;
    }

    renderItems = () => {
        const { stadiums, selectedKey } = this.props;
        const selectedIndex = selectedKey || this.state.selectedIndex || 0;
        const itemMode = this.oppositeMode();
        return stadiums.map((stadium, idx) => {
            const selected = idx === selectedIndex;
                return (
                    <SportItem
                        key={idx}
                        id={idx}
                        mode={itemMode}
                        sport={stadium.name}
                        selected={selected}
                        onClick={this.handleClick}
                    />)
        });
    }

    oppositeMode() {
        const mode = this.props.mode || 'horizontal';
        switch (mode) {
            case 'horizontal': return 'vertical';
            default: return 'horizontal';
        }
    }

    handleClick = (id) => {
        this.setState({ selectedIndex: id });
        this.props.onSelect && this.props.onSelect(id);
    }
}

export default SportItemList;