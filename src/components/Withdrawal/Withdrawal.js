import React from 'react';
import { connect } from 'dva';
import { Alert, Table, Switch, Pagination, Popconfirm, Button, message, Modal, Tabs, Row, Col } from 'antd';
import styles from './Withdrawal.less';
import { routerRedux, History } from 'dva/router';
import { PAGE_SIZE } from '../../constants';

const TabPane = Tabs.TabPane;
function Withdrawal({ dispatch, WithdraData, gettoken: gettoken, loading, page: page }) {

  function deleteHandler(value) {
    let typeThird = "no";
    new Promise((resolve, reject) => {
      dispatch({
        type: 'Withdrawal/fetchGetPass',
        payload: {
          value,
          typeThird,
          resolve,
          reject,
        }
      })
    }).then(res => {
      message.warning(res[0].msg)
    })
      .catch(err => {
        message.warning(err);
      })

  }
  function deleteBankcard(value) {
    let typeThird = "no";
    new Promise((resolve, reject) => {
      dispatch({
        type: 'Withdrawal/fetchGetPass',
        payload: {
          value,
          typeThird,
          resolve,
          reject,
        },
      })
    }).then(res => {
      message.warning(res[0].msg)
    })
      .catch(err => {
        message.warning(err);
      })

  }

  function passHandler(value) {
    let typeThird = "pass";
    new Promise((resolve, reject) => {
      dispatch({
        type: 'Withdrawal/fetchGetPass',
        payload: {
          value,
          typeThird,
          resolve,
          reject,
        },
      })
    }).then(res => {
      message.success(res[0].msg)
    })
      .catch(err => {
        message.warning(err);
      })

  }

  function passBankcard(value) {
    let typeThird = "pass";
    new Promise((resolve, reject) => {
      dispatch({
        type: 'Withdrawal/fetchGetPass',
        payload: {
          value,
          typeThird,
          resolve,
          reject,
        },
      })
    }).then(res => {
      message.success(res[0].msg)
    })
      .catch(err => {
        message.warning(err);
      })
  }

  function callback(key) {
    let page = 1;
    dispatch(routerRedux.push({
      pathname: '/Withdrawal',
      search: '?page=' + page + '&pagetype=' + key,
    }));
  }

  function pageChangeApply(page) {
    let pagetype = "Apply"
    dispatch(routerRedux.push({
      pathname: '/Withdrawal',
      search: '?page=' + page + '&pagetype=' + pagetype,
    }));
  }

  function pageChangeBank(page) {
    let pagetype = "Bank"
    dispatch(routerRedux.push({
      pathname: '/Withdrawal',
      search: '?page=' + page + '&pagetype=' + pagetype,
    }));
  }



  const columnbank = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },

    {
      title: '收款人姓名',
      dataIndex: 'alipay_name',
      key: 'alipay_name',
    },
    {
      title: '云平台编号',
      dataIndex: 'cloudid',
      key: 'cloudid',
    },
    {
      title: '商铺ID',
      dataIndex: 'shopid',
      key: 'shopid',
    },
    {
      title: '银行名称',
      dataIndex: 'bank_name',
      key: 'bank_name',
    },
    {
      title: '银行卡号',
      dataIndex: 'banknum',
      key: 'banknum',
    },
    {
      title: '公司名称',
      dataIndex: 'company',
      key: 'company',
    },
    {
      title: '转账金额(元)',
      dataIndex: 'getmoney',
      key: 'getmoney',
    },
    {
      title: '申请时间',
      dataIndex: 'applyfortime',
      key: 'applyfortime',
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          {

          }
          <Popconfirm title="确定通过这条信息吗?" onConfirm={passBankcard.bind(null, record.id)}>
            <a href="">通过</a>
          </Popconfirm>
          <Popconfirm title="确定拒绝这条信息吗?" onConfirm={deleteBankcard.bind(null, record.id)}>
            <a href="">拒绝</a>
          </Popconfirm>
        </span>
      ),
    },
  ];


  const columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },

    {
      title: '收款人姓名',
      dataIndex: 'alipay_name',
      key: 'alipay_name',
    },
    {
      title: '云平台编号',
      dataIndex: 'cloudid',
      key: 'cloudid',
    },
    {
      title: '商铺ID',
      dataIndex: 'shopid',
      key: 'shopid',
    },
    {
      title: '支付宝账号',
      dataIndex: 'alipaynum',
      key: 'alipaynum',
    },
    {
      title: '转账金额(元)',
      dataIndex: 'getmoney',
      key: 'getmoney',
    },
    {
      title: '申请时间',
      dataIndex: 'applyfortime',
      key: 'applyfortime',
    },
    {
      title: '操作',
      key: 'operation',
      render: (text, record) => (
        <span className={styles.operation}>
          <Popconfirm title="确定通过这条信息吗?" onConfirm={passHandler.bind(null, record.id)}>
            <a href="">通过</a>
          </Popconfirm>
          <Popconfirm title="确定拒绝这条信息吗?" onConfirm={deleteHandler.bind(null, record.id)}>
            <a href="">拒绝</a>
          </Popconfirm>
        </span>
      ),
    },
  ];
  return (
    <div className={styles.normal}>
      <Tabs defaultActiveKey="Apply" onChange={callback}>
        <TabPane tab="支付宝" key="Apply">
          <Row>
            <Col span={24}>
              <Table
                columns={columns}
                dataSource={WithdraData.results}
                loading={loading}
                rowKey={record => record.id}
                pagination={false}
              />
              <Pagination
                className="ant-table-pagination"
                defaultCurrent={1}
                total={WithdraData.count}
                current={page}
                pageSize={PAGE_SIZE}
                onChange={pageChangeApply}
              />
            </Col>
          </Row>

        </TabPane>
        <TabPane tab="银行卡" key="Bank">
          <Row>
            <Col span={24}>
              <Table
                columns={columnbank}
                dataSource={WithdraData.results}
                loading={loading}
                rowKey={record => record.id}
                pagination={false}
              />
              <Pagination
                className="ant-table-pagination"
                defaultCurrent={1}
                total={WithdraData.count}
                current={page}
                pageSize={PAGE_SIZE}
                onChange={pageChangeBank}
              />
            </Col>
          </Row>

        </TabPane>
      </Tabs>



    </div>
  );
}


function mapStateToProps(state) {
  const { WithdraData, gettoken, page } = state.Withdrawal;
  return {
    loading: state.loading.models.Withdrawal,
    WithdraData,
    gettoken,
    page
  };
}

export default connect(mapStateToProps)(Withdrawal);
