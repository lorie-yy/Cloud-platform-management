import * as Thirdpartyconfig from '../services/Thirdpartyconfig';
import queryString from 'query-string';
export default {
  namespace: 'Thirdparyconfig',
  state: {
    list: [],
    page:null
  },
  //reducers唯一可以修改state的地方，用于处理同步操作
  reducers: {
     save(state, { payload: { data:list,page:page } }) {
        return { ...state, list, page};
     },
},
effects: {
    *fetchThirdparty({ payload: { page = 1 } }, { call, put }) {
        const { data } = yield call(Thirdpartyconfig.fetchs , page);
        yield put({
          type: 'save',
          payload: {
            data,
            page: parseInt(page, 10),
          },
        });
      }
    ,
    *saveThirdparty({ payload}, { call, put }) {
    	const { list, values,resolve, reject } = payload;
    	  let idData = list.id,typeThirdData = list.typeThird;
        let success =yield call(Thirdpartyconfig.create, values, idData , typeThirdData);        
        if(success){
        		resolve(success);
        }else {
		     	reject(success);
			  }
        yield put({ type: 'reload' });
      },

      *reload(action, { put, select }) {
            const page = yield select(state => state.Thirdparyconfig.page);
            yield put({ type: 'fetchThirdparty', payload: { page } });
      },
},
    subscriptions: {
        setup({ dispatch, history }) {
              return history.listen(({ pathname, search }) => {
        			const query = queryString.parse(search);            
                    if (pathname === '/Thirdpartyconfig') {
                    dispatch({ type: 'fetchThirdparty', payload: query  });
              }
        });
      },
    },
};
