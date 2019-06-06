import Router, { withRouter } from 'next/router';
import { connect } from 'react-redux';
import ScreenAction from '../../redux/screen/actions';

class LoadingLink extends React.Component {
    render() {
        return (
            <span onClick={this.handleClick}>
                {this.props.children}
            </span>
        )
    }

    handleClick = async () => {
        const { href, replace, onClick } = this.props;
        if (this.props.router.pathname === href)
            return;

            this.props.startLoad();

        if (onClick)
            await onClick();

        
        if (replace)
            Router.replace(href);
        else
            Router.push(href);
    }
}

export default connect(
    state => state.Screen,
    ScreenAction)
    (withRouter(LoadingLink));