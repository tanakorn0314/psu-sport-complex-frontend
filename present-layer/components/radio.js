import { colors } from '../styles/constants/colors';

const Radio = (props) => (
    <span className='container'>
        <input
            id={props.label}
            value={props.value}
            onChange={props.onChange}
            className='radio'
            type='radio'
            name={props.name}
        />
        <label htmlFor={props.label} className='checkmark'>{props.label}</label>
        <style jsx>{`
        .container {
            display: initial;
            padding: 10px 10px 10px 0;
        }
        .radio {
            display: none;
        }
        .checkmark {
            position: relative;
            padding-left: 28px;
            cursor: pointer;
        }
        .checkmark:before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 18px;
            height: 18px;
            border-radius: 100%;
            border: 1px solid ${colors.border};
        }
        .radio:checked + .checkmark:after,
        .radio:not(:checked) + .checkmark:after {
            content: '';
            position: absolute;
            top: 4px;
            left: 4px;
            width: 12px;
            height: 12px;
            border-radius: 100%;
            background-color: #000;
            -webkit-transition: all 0.2s ease;
            transition: all 0.2s ease;
        }
        .radio:checked + .checkmark:after {
            opacity: 1;
            transform: scale(1);
            -webkit-transform: scale(1);
        }
        .radio:not(:checked) + .checkmark:after {
            opacity: 0;
            transform: scale(0);
            -webkit-transform: scale(0);
        }
        `}</style>
    </span>
);

export default Radio;