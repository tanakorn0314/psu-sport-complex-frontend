import React from 'react';
import { withNamespaces } from '../i18n';

export default ComposedComponent => {
    class withText extends React.Component {
        render() {
            const { msg, children, noTranslate, t } = this.props;
            const propsText = msg ? msg : children;

            let display = !noTranslate ? t(propsText) : propsText;

            if (!isNaN(display))
                display = display.toString();
            if (Array.isArray(display))
                display = display.join('');

            const displayArr = display.split('\n');
            const last = displayArr.length - 1;
            const displayHtml = displayArr.map((d, idx) => {
                if (d.length === 0) return <React.Fragment key={idx}></React.Fragment>;
                return (<React.Fragment key={idx}>{d}{idx < last && <br />}</React.Fragment>)
            })
            return (
                <ComposedComponent {...this.props}>
                    {displayHtml}
                </ComposedComponent>
            )
        }
    }
    return withNamespaces('common')(withText);
}
