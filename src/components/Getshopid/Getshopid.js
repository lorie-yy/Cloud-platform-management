import React from 'react';
import { connect } from 'dva';
import { Row, Col, Table, Pagination, message, Popconfirm, Button, Tag, Alert } from 'antd';

import { routerRedux } from 'dva/router';

import styles from './Getshopid.less';
import Getshopmodal from './Getshopmodal';
// import Getshopedit from './Getshopedit';
import { PAGE_SIZE } from '../../constants';

function Getshopid({ dispatch, shopAll: dataSource, page: page, getshopidSelect, getcoloud, loading }) {

  function getShopid(values) {
    new Promise((resolve, reject) => {
      dispatch({
        type: 'Getshopidmodel/saveCloudconfig',
        payload: {
          values,
          resolve,
          reject,
        }
      })
    }).then(res => {
      res.length ? null : message.warning("当前云平台下没有可选择的商铺")
    })
      .catch(err => {
        message.success(err);
      })

  }

  function getShopidlist(value) {
    let typeThird = "add";
    new Promise((resolve, reject) => {
      dispatch({
        type: 'Getshopidmodel/addCloudconfig',
        payload: {
          value,
          typeThird,
          resolve,
          reject,
        },
      })
    }).then(res => {
      if (res.res == 0) {
        message.success("添加成功");
      }
    })
      .catch(err => {
        message.success(err);
      })

  }

  function deleteHandler(shopid, cloudid) {
    var value = {
      cloudid: cloudid,
      shopid: shopid,
      bonus: bonus
    };
    let typeThird = "del";
    new Promise((resolve, reject) => {
      dispatch({
        type: 'Getshopidmodel/addCloudconfig',
        payload: {
          value,
          typeThird,
          resolve,
          reject,
        }
      })
    }).then(res => {
      if (res.res == 0) {
        message.success("删除成功");
      }
    })
      .catch(err => {
        message.success(err);
      })

  }

  function editThirdparty(value) {
    let typeThird = "edit";
    new Promise((resolve, reject) => {
      dispatch({
        type: 'Getshopidmodel/addCloudconfig',
        payload: {
          value,
          typeThird,
          resolve,
          reject,
        }
      })
    }).then(res => {
      if (res.res == 0) {
        message.success("修改成功");
      }
    })
      .catch(err => {
        message.success(err);
      })
  }

  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/Getshopid',
      search: '?page=' + page,
    }));
  }

  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '商铺ID',
      dataIndex: 'shopid',
      key: 'shopid',
    },

    {
      title: '分成',
      dataIndex: 'discount',
      // key: 'discount',
      render: text => <div style={{ color: "#f04134" }}>{text}</div>,
    },
    {
      title: '编辑',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <Getshopmodal record={record} onOk={editThirdparty}>
            <a>修改</a>
          </Getshopmodal>

          <Popconfirm title="确认要删除吗?" onConfirm={deleteHandler.bind(null, record.shopid, record.cloudid)}>
            <a href="">删除</a>
          </Popconfirm>
        </span>
      ),
    },
  ];

  return (
    <div className={styles.normal}>
      <Getshopmodal getcoloud={getcoloud} getshopidSelect={getshopidSelect} addTodo={getShopid} onOk={getShopidlist} record={{}} >
        <Button className={styles.newly} type="primary">新增配置折扣</Button>
      </Getshopmodal>
      <div>
        <Table
          columns={columns}
          dataSource={dataSource.results}
          loading={loading}
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
      </div>
    </div>
  );
}

function mapStateToProps(state) {
  const { shopAll, getshopidSelect, page, getcoloud } = state.Getshopidmodel;
  return {
    loading: state.loading.models.Getshopidmodel,
    shopAll,
    getshopidSelect,
    page,
    getcoloud
  };

}

export default connect(mapStateToProps)(Getshopid);
