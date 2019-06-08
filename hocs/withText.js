import React from 'react';
import { withNamespaces } from '../i18n';

export default ComposedComponent => {
    class withText extends React.Component {
        render() {
            let { msg, children, noTranslate, t } = this.props;
            let propsText = msg ? msg : children;

            if (!isNaN(propsText))
                propsText = propsText.toString();
            if (Array.isArray(propsText))
                propsText = propsText.join('');

            let display;
            if (noTranslate || propsText.includes(' '))
                display = propsText;
            else
                display = t(propsText);

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
