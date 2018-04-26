import * as Set from '../services/Set';
import queryString from 'query-string';

export default {
  namespace: 'Set',
  state: {
    set: [],
  },
  reducers: {
    save(state, { payload: { data: set } }) {
      return { ...state, set };
    }

  },
  effects: {
    *fetchSet({ payload }, { call, put }) {
      const { values, reject, resolve } = payload
      const { data } = yield call(Set.fetchSet, values);
      yield put({
        type: 'save',
        payload: {
          data,
        },
      });
    }

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        const query = queryString.parse(search);
        if (pathname === '/Set') {
          dispatch({ type: 'fetchSet', payload: query });
        }
      });
    }


  },
};
