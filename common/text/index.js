import en from './en';
import th from './th';
import month from './month';
import position from './position';
import error from './error';


const selectedLang = 'th';

const text = {
    en,
    th
}

export const positions = position;

export const locale = selectedLang;
export const months = month[selectedLang];
export const errors = error[selectedLang];
export default text[selectedLang];
