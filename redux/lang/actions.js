import { setLang as setLangCookie } from '../../helpers/lang';

const actions = {
  SET_LANG: 'SET_LANG',
  setLang: (lang) => (dispatch) => {
    setLangCookie(lang);
    dispatch({type: actions.SET_LANG, payload: lang});
  }
};
export default actions;
