import React from 'react';
import { connect } from 'dva';
import { Alert,Table, Pagination, Popconfirm, Button,message } from 'antd';
import { routerRedux  } from 'dva/router';

import { PAGE_SIZE } from '../../constants';

import styles from './Cloudconfig.less';
import Cloudmodal from './Cloudmodal';


function Cloudconfig({ props,dispatch, cloudData,page:page, thirdpartdatals,Clouddatals, loading ,total }) {
  
  function deleteThirdparty(cloudid){
  	var value={
  		cloudid:cloudid,
  		thirdpart:'',
  	};
  	let typeThird = "del";
  	new Promise((resolve, reject) => {
	  	dispatch({
		      type: 'Cloudconfigmodel/saveCloudconfig',
		      payload: {
		      	value,
		      	typeThird,
		      	resolve,
             	reject,
		      }
		    })
	  	}).then( res => {

		      if(res.error == 0){
	      		   message.success("删除成功");
	      		}else{
      			   message.success(res.msg);
	      		}
   			})
	 		.catch( err => {
	      		message.success(err);
  		})

	}

  function editThirdparty(value){
  	let typeThird = "edit";
  	new Promise((resolve, reject) => {
	  	dispatch({
		      type: 'Cloudconfigmodel/saveCloudconfig',
		      payload: {
		      	value,
		      	typeThird,
		      	resolve,
             	reject,
		      }
		    })
  		}).then( res => {
		      if(res.error == 0){
	      		 message.success("修改成功");
	      		}else{
      			   message.success(res.msg);
	      		}
   			})
	 		.catch( err => {
	      		message.success(err);
  		})

	}

  function loginUserList(value){
	 let typeThird = "add";
	 new Promise((resolve, reject) => {
	  	 dispatch({
		      type: 'Cloudconfigmodel/saveCloudconfig',
		      payload: {
		      	value,
		      	typeThird,
		        resolve,
             	reject,
             }
		    })
	  	}).then( res => {
  				if(res.error == 0){
	      		 	message.success("添加成功");
	      		}else{
      			   message.success(res.msg);
	      		}
   			})
	 		.catch( err => {
	      		message.success(err);
  		})
  }

    function pageChangeHandler(page){
		dispatch(routerRedux.push({
			pathname: '/Cloudconfig',
			search:'?page='+page,
		}));
  }


	 
	const columns = [         
    	{
	      title: '云平台名称',
	      dataIndex: 'cloudname',
	      key: 'cloudname',
	    },
	    {
	      title: '云平台编号',
	      dataIndex: 'cloudid',
	      key: 'cloudid',
	    },
	    {
	      title: '第三方名称',
	      dataIndex: 'thirdpart_name',
	      key: 'thirdpart_name',
	    },
	    {
	      title: '编辑',
	      key: 'operation',
	      render: (text, record) => (
	        <span className={styles.operation}>
	          <Cloudmodal thirdpartdatals={thirdpartdatals} record={record} onOk={editThirdparty}>
            		<a>修改</a>
          	  </Cloudmodal>
	          <Popconfirm title="确认要删除吗?" onConfirm={deleteThirdparty.bind(null, record.cloudid)}>
	            	<a href="">删除</a>
	          </Popconfirm>
	        </span>
	      ),
	    },
  ];
  return (
    <div className={styles.normal}>     
	 	 <Cloudmodal thirdpartdatals={thirdpartdatals} Clouddatals={Clouddatals} record={{}} onOk={loginUserList}>
        		<Button className={styles.newly} type="primary">新增云平台配置</Button>
      	  </Cloudmodal>
        <div>
            <Table
				loading={loading}
				columns={columns}
				loading={loading}
				dataSource={cloudData.results}
				rowKey={record => record.cloudid}
				pagination={false}
              />
             <Pagination
				className="ant-table-pagination"
				defaultCurrent={1}
				total={cloudData.count}
				current={page}
				pageSize={PAGE_SIZE}           
				onChange={pageChangeHandler}
            />
          </div>     
    </div>
  );
}

function mapStateToProps(state) {
   const { cloudData ,thirdpartdatals ,Clouddatals, page } = state.Cloudconfigmodel;   
   return {
    loading: state.loading.models.Cloudconfigmodel,
    cloudData,
    thirdpartdatals,
    Clouddatals,
    page

  };
  
}

export default connect(mapStateToProps)(Cloudconfig);

