import React from 'react';
import { connect } from 'dva';
import { routerRedux  } from 'dva/router';
import { Alert,Table, Switch , Pagination, Popconfirm,message, Button, Modal } from 'antd';

import styles from './Thirdparyconfig.less';
import { PAGE_SIZE } from '../../constants';
import ThirdpartyModal from './ThirdpartyconfigModal';


function Thirdpartyconfig({ dispatch, list: dataSource, page, loading ,total }) {
  function deleteHandler(id) {
		let values = {};
		values.name;
		values.url;
		values.type;
		let typeThird = "del"
	    let list = {
   			typeThird:typeThird,
   			id:id
   		}
   		new Promise((resolve, reject) => {
  	    dispatch({
  	      type: 'Thirdparyconfig/saveThirdparty',
  	      payload: {
  	      	values ,
  	      	list,
  	     	  resolve,
  	      	reject
  	      }
  	    });
	}).then( res => {
	      if(res.data.error == 0){
      		 	message.success("删除成功");
      		}else if(res.data.error == 4){
      			message.error('删除失败');
      		}else if(res.data.error == 2){
      			message.warning(res.data.msg);
      		}
		})
 		.catch( err => {
 			message.error("出异常了")
  		})

  }

   function editThirdparty (id, values) {
   		let typeThird = "edit"
   		let list = {
   			typeThird:typeThird,
   			id:id
   		}
   		new Promise((resolve, reject) => {
		     dispatch({
		      type: 'Thirdparyconfig/saveThirdparty',
		      payload: { 
		      	values ,
		      	list,
		      	resolve,
		      	reject,
		      }
		    });
		}).then( res => {
			      if(res.data.error == 0){
		      		 	message.success("修改成功");
		      		}else if(res.data.error == 1){
		      			message.error('修改失败');
		      		}else if(res.data.error == 2){
		      			message.warning(res.data.msg);
		      		}
   			})
		 		.catch( err => {
		 			console.log(err)
	      			message.error("出异常了")
		  		})
  }

  function ThirdpartyList(values) {
  		let typeThird = "add";
  		let id = -1;
  		let list = {
   			typeThird:typeThird,
   			id:id
   		}
   		new Promise((resolve, reject) => {
	    dispatch({
	      type: 'Thirdparyconfig/saveThirdparty',
	      payload: {
	      	values ,
	        list,	
	        resolve,
	      	reject,
	   }
	    })
	}).then( res => {
		      if(res.data.error == 0){
	      		 	message.success("新增成功");
	      		}else if(res.data.error == 3){
		      		message.error('新增失败');
	      		}else if(res.data.error == 2){
      				message.warning(res.data.msg);
  				}
   			})
	 		.catch( err => {
	      			message.error("出异常了")
	  		})
  	}


  function pageChangeHandler(page){
         dispatch(routerRedux.push({
          pathname: '/Thirdpartyconfig',
          search:'?page='+page,
        }));
      }

  	const columns = [         
    {
      title: 'Name',
      dataIndex: 'thirdpartname',
      key: 'thirdpartname',
    },
    {
      title: 'type',
      dataIndex: 'type',
      sorter: (a, b) => a.type - b.type,
    },
    {
      title: 'url',
      dataIndex: 'url',
      key: 'url',
    },
    {
      title: '编辑',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
 			
  		   <ThirdpartyModal record={record} onOk={editThirdparty.bind(null, record.id)}>
            <a>修改</a>
          </ThirdpartyModal>
  		
          <Popconfirm title="确认要删除吗?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="">删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.normal}>
    	<ThirdpartyModal  record={{}} onOk={ThirdpartyList}>
           <Button className={styles.newly} type="primary">新增</Button>
        </ThirdpartyModal>
        {dataSource?

          <div>
            	<Table
            		  loading={loading}
            		  columns={columns}
	                  dataSource={dataSource.results}
	                  rowKey={record => record.id}
	                  pagination={false}
                />
                <Pagination
                  className="ant-table-pagination"
                  defaultCurrent={1}
                  total={dataSource.count}
                  current={page}
                  pageSize={PAGE_SIZE}           
                  onChange={pageChangeHandler}
              />
        </div>:<Alert style={{width:300}} message="暂无数据啦" type="success " />

        }

    </div>
  );
}

function mapStateToProps(state) {
   const { list , count , page } = state.Thirdparyconfig;
   return {
    loading: state.loading.models.Thirdparyconfig,
    list,
    count,
    page
  };
}

export default connect(mapStateToProps)(Thirdpartyconfig);
