import * as Withdrawal from '../services/Withdrawal';
import queryString from 'query-string';

export default {
  namespace: 'Withdrawal',
  state: {
    WithdraData: [],
    gettoken: [],
    page: null
  },
  reducers: {
    save(state, { payload: { data: WithdraData, fetchGetPassdata: gettoken, page: page } }) {

      for (let i = 0; i < WithdraData.results.length; i++) {

        WithdraData.results[i].getmoney = WithdraData.results[i].getmoney / 100;

      }

      return { ...state, WithdraData, page };
    },
  },
  effects: {
    *fetchWithdrawal({ payload: { page = 1, pagetype = "Apply" } }, { call, put }) {
      const { data } = yield call(Withdrawal.fetchWithdrawal, page, pagetype);
      yield put({
        type: 'save',
        payload: {
          data,
          page: parseInt(page, 10),
        },
      });
    },
    *fetchGetPass({ payload }, { call, put }) {
      const { value, typeThird, resolve, reject } = payload;
      let success = yield call(Withdrawal.fetchGetPass, value, typeThird);
      if (success) {
        resolve(success.data);
      } else {
        reject('崩溃啦');
      }
      yield put({ type: 'reload' });
    },
    *reload(action, { put, select }) {
      const page = yield select(state => state.Withdrawal.page);
      yield put({ type: 'fetchWithdrawal', payload: { page } });
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        const query = queryString.parse(search);
        if (pathname === '/Withdrawal') {
          dispatch({ type: 'fetchWithdrawal', payload: query });
        }
      });
    },
  },
};
