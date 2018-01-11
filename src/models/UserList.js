import * as User from '../services/UserList';

import queryString from 'query-string';

export default {
  namespace: 'UserList',
  state: {
    UserData:[],
    userhome:[],
    count: null,
    page:null,
   
  },
  reducers: {
  	save(state, { payload: {data:UserData,page} }) { 

  		let userhome =[];
  		for(let i = 0 ; i< UserData.datelist.length;i++){
  			 userhome[i]={}
			 userhome[i]['cloud'] = JSON.parse(UserData.datelist[i].cloudinfo);
			 userhome[i]['username']=UserData.datelist[i].username 			
  		}
		  return { ...state, UserData,userhome,page};      
	},

  },
  effects: {
    *fetchUser({ payload: { page = 1}}, { call, put}) {
        const {data} = yield call(User.fetchUser,page);
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
    setup({dispatch,history}){
       return history.listen(({ pathname, search }) => {
        const query = queryString.parse(search);
             if (pathname === '/UserList') {
                  dispatch({ type: 'fetchUser',payload: query});
            }
         });
    }

  },
};
