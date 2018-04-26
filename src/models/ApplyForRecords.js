import * as ApplyForRecords from '../services/ApplyForRecords';
import queryString from 'query-string';

export default {
  namespace: 'ApplyForRecords',
  state: {
    fetchApplydata: [],
    page: null,
  },
  reducers: {
    save(state, { payload: { data: fetchApplydata, page: page } }) {

      for (let i = 0; i < fetchApplydata.results.length; i++) {
        fetchApplydata.results[i].getmoney = fetchApplydata.results[i].getmoney / 100;
      }

      return { ...state, fetchApplydata, page };

    },
  },
  effects: {
    *fetchApply({ payload: { page = 1, pagetype = "Apply" } }, { call, put }) {
      const { data } = yield call(ApplyForRecords.fetchApply, page, pagetype);
      yield put({
        type: 'save',
        payload: {
          data,
          page: parseInt(page, 10),
        },
      });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        const query = queryString.parse(search);
        if (pathname === '/ApplyForRecords') {
          dispatch({ type: 'fetchApply', payload: query });
        }
      });
    },
  },
};
