import * as GetshopID from '../services/Getshopid';
import * as Cloudconfig from '../services/Cloudconfig';
import queryString from 'query-string';

export default {
  namespace: 'Getshopidmodel',
  state: {
    shopAll: [],
    getshopidSelect: [],
    page: null,
    getcoloud: []


  },
  reducers: {
    save(state, { payload: { data: shopAll, page: page, Cloudlist: cloud } }) {
      // console.log(shopAll)
      for (let i = 0; i < shopAll.results.length; i++) {
        shopAll.results[i].discountmodal = shopAll.results[i].discount
        if (shopAll.results[i].flag == 0) {
          shopAll.results[i].discount = '折扣：' + shopAll.results[i].discount
        } else

          if (shopAll.results[i].flag == 1) {
            shopAll.results[i].discount = '一口价：' + shopAll.results[i].fixedprice
          }
        shopAll.results[i].flag = shopAll.results[i].flag.toString()

      }
      var getcoloud = [];
      for (let cloudidyun of cloud) {
        getcoloud.push(cloudidyun.cloudid);
      }
      return { ...state, shopAll, page, getcoloud };
    },
    getshops(state, { payload: { getshopidSelect: getshopidSelect } }) {
      return { ...state, getshopidSelect };
    }

  },

  effects: {
    *fetchshopid({ payload: { page = 1 } }, { call, put }) {
      const { data } = yield call(GetshopID.fetchshopAll, page);
      const CloudAll = yield call(Cloudconfig.fetchname);
      let Cloudlist = CloudAll.data
      yield put({
        type: 'save',
        payload: {
          data,
          Cloudlist,
          page: parseInt(page, 10),
        },
      });
    },
    *saveCloudconfig({ payload }, { call, put, take, select }) {
      const { values, resolve, reject } = payload;
      const success = yield call(GetshopID.fetchshop, values);
      if (success) {
        resolve(success.data);
      } else {
        reject('崩溃啦');
      }
      var getshopidSelect = success.data
      yield put({ type: 'getshops', payload: { getshopidSelect: getshopidSelect } });
    },

    *addCloudconfig({ payload }, { call, put }) {
      const { typeThird, value, resolve, reject } = payload;
      let success = yield call(GetshopID.addshopinfo, value, typeThird);
      if (success) {
        resolve(success.data);
      } else {
        reject('崩溃啦');
      }
      yield put({ type: 'reload' });
    },

    *reload(action, { put, select }) {
      let page = yield select(state => state.Getshopidmodel.page);
      yield put({ type: 'fetchshopid', payload: { page } });
    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        const query = queryString.parse(search);
        if (pathname === '/Getshopid') {
          dispatch({ type: 'fetchshopid', payload: query });
        }
      });
    },

  },
};
