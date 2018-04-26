import * as SignUp from '../services/SignUp';

import queryString from 'query-string';

export default {
  namespace: 'SignUp',
  state: {
  },
  reducers: {
    save(state, { }) {
      return {};
    },
  },
  effects: {
    *SignUp({ payload }, { call, put }) {
      const { values, resolve, reject } = payload;
      const { data } = yield call(SignUp.SignUp, values);
      if (data) {
        resolve(data);
      } else {
        reject(data);
      }
    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        const query = queryString.parse(search);
        if (pathname === '/SignUp') {

          // dispatch({ type: 'SignUp', payload: query  });
        }
      });
    },
  },
};
