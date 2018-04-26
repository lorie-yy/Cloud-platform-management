import * as Earn from '../services/Earn';
import queryString from 'query-string';

export default {
  namespace: 'Earn',
  state: {
    list: [],
    allclouddata: [],
    count: null,
    page: null,
    dataTableEarn: [],

  },
  reducers: {
    save(state, { payload: { data: list, page: page } }) {
      let datatable = list.results;

      let EarnSource = [], allclouddata = [], count = list.count;
      // username
      /**for(let Earndata of list.results){
         EarnSource.push(Earndata.username);
      }   
      // let cloudiddata=[...new Set(EarnSource)];

      for(let cloud of EarnSource){
           //收益清零
          let dataSource ={
              cloudid:'',
              username:'',
              discount:0,
              totalincome:0,
              cashed : 0,
              availablecash:0,
              id:0,
          };

          // let intotal  = list.results.map(code=>code.totalincome);

          // console.log(eval(intotal.join("+")))

          // let abb = intotal.reduce(function(x,y){return x+y},0);

          for(let sum of list.results){
              // 赋值总收益
              if(sum.username == cloud){               
                  dataSource.totalincome+=sum.totalincome/100;
                  dataSource.cashed+=sum.cashed/100;
                  dataSource.availablecash+=sum.availablecash/100;
                  dataSource.discount+=sum.discount;
                  dataSource.username+=sum.username;
                  dataSource.id =sum.id;
              }               
          }  
            allclouddata.push(dataSource);
           
        }**/

      return { ...state, count, page, datatable };
    },
    datalist(state, { payload: { dataTableEarn } }) {
      console.log(dataTableEarn)
      return { ...state, dataTableEarn };
    }

  },
  effects: {
    *fetchearn({ payload: { page = 1, value = "" } }, { call, put }) {
      const { data } = yield call(Earn.fetchearn, page);
      yield put({
        type: 'save',
        payload: {
          data,
          page: parseInt(page, 10),
        },
      });
    },
    *dateearn({ payload }, { call, put }) {
      const datels = yield call(Earn.fetchinfo, payload);
      let dataTableEarn = JSON.parse(datels.data);
      yield put({
        type: 'datalist',
        payload: {
          dataTableEarn,
        },
      });
      console.log(dataTableEarn)
    }

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        const query = queryString.parse(search);
        if (pathname === '/Earn') {
          dispatch({ type: 'fetchearn', payload: query });
        }
      });
    }

  },
};
