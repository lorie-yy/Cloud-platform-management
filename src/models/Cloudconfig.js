import * as Cloudconfig from '../services/Cloudconfig';
import queryString from 'query-string';



export default {
  namespace: 'Cloudconfigmodel',
  state: {
  	 cloudData: [],
  	 Clouddatals:[],
  	 thirdpartdatals:[],
  	 page:null
  },
  reducers: {
  	 save(state, { payload: {data:cloudData,dataCloudlist:CloudName,ThirdpartynameData,page:page} }) {
		//云平台名称，第三方名称
		let Thirdpartynamelist = ThirdpartynameData.data;
		let Cloudlistnamelist = CloudName.data;
		let thirdpartdatals =[],Clouddatals=[];

		for(let ThirdData of Thirdpartynamelist){
			thirdpartdatals.push(ThirdData.thirdpartname)
			
		}
		for(let clouddata of Cloudlistnamelist){
			Clouddatals.push(clouddata.cloudid)
		}
    	return { ...state, cloudData ,Clouddatals ,thirdpartdatals,page };

 	 },
  },
  effects: {
  	*fetchCloudconfig({ payload: { page = 1 } }, { call, put }) {
  		 // dataSource
	    const {data} = yield call(Cloudconfig.fetchyun, page);
  		// 第三方
  		let alldata = 1;
	    const ThirdpartynameData  = yield call(Cloudconfig.fetchsTh, alldata);
	    // 云name
	    const dataCloudlist = yield call(Cloudconfig.fetchname);
	    yield put({
	      type: 'save',
	      payload: {
	        data,
	        dataCloudlist,
	        ThirdpartynameData,
	        page: parseInt(page, 10),

	      },
	    });
	  },
	  *saveCloudconfig({ payload}, { call, put }) {
	  		const { typeThird, value,resolve, reject } = payload;
		  	let cloudid = value.cloudid,thirdpart=value.thirdpart;
		    var success = yield call(Cloudconfig.savename, cloudid,thirdpart,typeThird);
		    if (success) {
		    	 console.log(success.data)
		    	 resolve(success.data);
			 } else {
			     reject(success);
			 }
		    yield put({ type: 'reload' });
	   	
	  },

	  *reload(action, { put, select }) {
          const page = yield select(state => state.Cloudconfigmodel.page);
          yield put({ type: 'fetchCloudconfig', payload: { page }  });
      },

  },
  subscriptions: {
  	setup({ dispatch, history }) {
	     return history.listen(({ pathname, search }) => {
    	 const query = queryString.parse(search);
	      if (pathname === '/Cloudconfig') {
	      	    dispatch({ type: 'fetchCloudconfig', payload: query  });
	    	}
	   });
	},
  },
};
