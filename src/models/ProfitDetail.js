import * as Earn from '../services/Earn';
import queryString from 'query-string';

export default {
  namespace: 'ProfitDetail',
  state: {
  	list:[],
    
  },
  reducers: {
  	save(state, { payload: {datalist:list} }) {
      for (let i = 0 ;i<list.length;i++){
        list[i].totalincome=list[i].totalincome/100;
        list[i].availablecash=list[i].availablecash/100;
        list[i].cashed=list[i].cashed/100
      }
  		return { ...state, list };
  	}
  },
  effects: {
  	*fetchpro( { payload:value},{call,put}){
        const {data} = yield call(Earn.fetchpro ,value);
        let datalist = data.results
        yield put({
	        type: 'save',
	        payload: {
	          datalist,
	        },
     	 });
      }
  },
  subscriptions: {
  	 setup({dispatch,history}){
       		return history.listen(({ pathname, search }) => {
			const query = queryString.parse(search);        
             if (pathname === '/ProfitDetail') {
                  dispatch({ type: 'fetchpro', payload: query  });
              }
         });
    }
  },
};
