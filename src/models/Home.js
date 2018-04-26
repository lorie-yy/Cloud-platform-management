import * as Home from '../services/Home';

import queryString from 'query-string';

export default {
  namespace: 'Home',
  state: {
    HomeData: [],
    dataSourcename: [],
    myDateArr: [],
  },
  reducers: {
    save(state, { payload: { data: HomeData } }) {
      //ce
      let data = []; let dataSour = {};

      let dataSourcename = new Array();
      let myDateArr = new Array();
      let count = HomeData.lastweeklydate.length;            //外层数据长度
      for (let i = 0; i < count; i++) {

        //fields name
        let valu = Object.keys(HomeData.lastweeklydate[i])
        dataSourcename.push(valu.join(''));
        //ce
        data[i] = {};
        data[i]['name'] = valu.join('');

        // dataSour.name = valu.join('');

        //获得名字
        let key = Object.keys(HomeData.lastweeklydate[i])[0];
        //获取这个KEY  的长度
        let count_data_length = HomeData.lastweeklydate[i][key].length;
        for (let j = 0; j < count_data_length; j++) {
          if (i == 0) {
            //只取第一个人的data就行了，以后所有人的date都一样，date只要存一次
            // myDateArr[j] = new Array();
            myDateArr[j] = {};
            myDateArr[j]["date"] = HomeData.lastweeklydate[i][key][j].date;
            myDateArr[j][key] = HomeData.lastweeklydate[i][key][j].userincome;
          } else {
            let date_length = myDateArr.length;//获取有多少个日期
            // console.log(date_length);
            //循环第二个人开始就需要判断日期合适才存进去
            for (let k = 0; k < date_length; k++) {
              if (HomeData.lastweeklydate[i][key][j].date == myDateArr[k].date) {
                myDateArr[k][key] = HomeData.lastweeklydate[i][key][j].userincome;
              }
            }
          }
        }
      }

      return { ...state, HomeData, dataSourcename, myDateArr };
    },

  },
  effects: {
    *fetchHome({ payload }, { call, put }) {
      const { data } = yield call(Home.fetchHome);
      yield put({
        type: 'save',
        payload: {
          data,
        },
      });
    },

  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname, search }) => {
        const query = queryString.parse(search);
        if (pathname === '/Home') {
          dispatch({ type: 'fetchHome', payload: query });
        }
      });
    }

  },
};
