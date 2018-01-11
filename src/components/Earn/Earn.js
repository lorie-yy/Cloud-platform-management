import React from 'react';
import styles from './Earn.less';
import { connect } from 'dva';
import { routerRedux  } from 'dva/router';
import { Alert,Table, Switch , Pagination, Popconfirm, Button, Modal } from 'antd';

import { PAGE_SIZE } from '../../constants';

function Earn({ dispatch ,list, allclouddata, count, page, loading}) { 
  function pageChangeHandler(page){
     dispatch(routerRedux.push({
      pathname: '/Earn',
      search:'?page='+page,
    }));
  }

  function getShopidlist(value){
     dispatch({
       type:'',
       payload:{},
      });

   }

   function viewmore(value){
     dispatch(routerRedux.push({
        pathname: '/ProfitDetail',
        search:'?value='+value,
      }));
   }

  function getShopid (value){
    
  }
  const columns = [   
     {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },      

     {
      title: '总收益(元)',
      dataIndex: 'totalincome',
      key: 'totalincome',
     },
     {title: '可提现(元)',
      dataIndex: 'availablecash',
      key: 'availablecash',
    },
    {title: '已提现(元)',
      dataIndex: 'cashed',
      key: 'cashed',
    },
    {title: '折扣',
      dataIndex: 'discount',
      key: 'discount',
    },
  ];
 
  return (
    <div className={styles.normal}>
    	
	          <div>
	            <Table
	              columns={columns}
	              dataSource={allclouddata}
	              loading={loading}
	              rowKey={record => record.id}
	              pagination={false}
	             />

	              <Pagination
	              className="ant-table-pagination"
	              defaultCurrent={1}
	              total={count}
	              current={page}
	              pageSize={PAGE_SIZE}           
	              onChange={pageChangeHandler}
	            />
	        </div>
    </div>
  );
}

function mapStateToProps(state) {
   const { list ,allclouddata,count,page} = state.Earn;
   return {
    loading: state.loading.models.Earn,
    list,
    allclouddata,
    count,
    page
  };

}

export default connect(mapStateToProps)(Earn);