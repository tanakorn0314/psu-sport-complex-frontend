import NewsService from '../../core/service/newsService';
import helper from './helper';

const actions = {
  FETCH_NEWS_SUCCESS: 'FETCH_NEWS_SUCCESS',
  CREATE_NEWS: 'CREATE_NEWS',
  UPDATE_NEWS: 'UPDATE_NEWS',
  DELETE_NEWS: 'DELETE_NEWS',
  fetchNews: (id) => async () => {
    const result = await NewsService.fetchNews(id);
    if (result && result.error)
      return null;
    return result;
  },
  fetchNewsFeed: () => async (dispatch, getState) => {
    const { newsList } = getState().News;
    const result = await NewsService.fetchNewsFeed(newsList.length);
    if (result && !result.error) {
      const lastInStore = newsList[0];
      const lastResult = result[0];
      if (lastInStore !== lastResult)
        dispatch({ type: actions.FETCH_NEWS_SUCCESS, payload: result });
    }
    return result;
  },
  postNews: (dto) => async (dispatch, getState) => {
    const { idToken } = getState().Auth;
    const result = await NewsService.postNews(idToken, dto);
    dispatch({ type: actions.CREATE_NEWS, payload: result });
    return result;
  },
  updateNews: (id, dto) => async (dispatch, getState) => {
    const { idToken } = getState().Auth;
    let { newsList } = getState().News;
    const result = await NewsService.updateNews(idToken, id, dto);
    const updated = helper.updateNews(newsList, id, dto);
    dispatch({ type: actions.UPDATE_NEWS, payload: updated });
    return result;
  },
  deleteNews: (id) => async (dispatch, getState) => {
    const { idToken } = getState().Auth;
    let { newsList } = getState().News;
    const result = await NewsService.deleteNews(idToken, id);
    const deleted = helper.deleteNews(newsList, id);
    dispatch({ type: actions.DELETE_NEWS, payload: deleted });
    return result;
  }
};
export default actions;
