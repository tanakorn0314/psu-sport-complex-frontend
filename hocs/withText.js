import React from 'react';
import text from '../common/text';

export default ComposedComponent => props => {
    const propsText = props.msg ? props.msg : props.children;
    const noTranslate = props.noTranslate;

    let display = (text[propsText] && !noTranslate) ? text[propsText] : propsText;

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
        <ComposedComponent {...props}>
            {displayHtml}
        </ComposedComponent>
    )
}
