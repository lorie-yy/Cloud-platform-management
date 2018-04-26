import React from 'react';
import { connect } from 'dva';
import { Link, History } from 'dva/router';
import { routerRedux } from 'dva/router';
import { PAGE_SIZE } from '../../constants';
import styles from './ApplyForRecords.less';


import { Table, Alert, Switch, Tag, Pagination, Popconfirm, Button, Tabs, Row, Col } from 'antd';

const TabPane = Tabs.TabPane;
function ApplyForRecords({ dispatch, fetchApplydata, page: page, loading, total }) {

  function callback(key) {
    let page = 1;
    dispatch(routerRedux.push({
      pathname: '/ApplyForRecords',
      search: '?page=' + page + '&pagetype=' + key,
    }));
  }

  let fetchApplyresults = fetchApplydata.results;
  if (fetchApplyresults) {
    for (let i = 0; i < fetchApplyresults.length; i++) {
      let applist = fetchApplyresults[i].paymentresult;
      if (applist == 101) {
        fetchApplyresults[i].paymentresult = <Tag color="orange">已通过</Tag>
      } else if (applist == 102) {
        fetchApplyresults[i].paymentresult = <Tag color="blue">已拒绝</Tag>
      }
    }
  }

  function pageChangeApply(page) {
    let pagetype = "Apply"
    dispatch(routerRedux.push({
      pathname: '/ApplyForRecords',
      search: '?page=' + page + '&pagetype=' + pagetype,
    }));
  }
  function pageChangeBank(page) {
    let pagetype = "Bank"
    dispatch(routerRedux.push({
      pathname: '/ApplyForRecords',
      search: '?page=' + page + '&pagetype=' + pagetype,
    }));
  }

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
      title: "处理结果",
      dataIndex: 'paymentresult',
      key: 'paymentresult',

    },
  ];

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
      title: "处理结果",
      dataIndex: 'paymentresult',
      key: 'paymentresult',

    },
  ];

  return (
    <div>

      <Tabs defaultActiveKey="Apply" onChange={callback}>
        <TabPane tab="支付宝" key="Apply">
          <Row>
            <Col span={24}>
              <Table
                columns={columns}
                dataSource={fetchApplydata.results}
                loading={loading}
                rowKey={record => record.id}
                pagination={false}
              />
              <Pagination
                className="ant-table-pagination"
                defaultCurrent={1}
                total={fetchApplydata.count}
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
                dataSource={fetchApplydata.results}
                loading={loading}
                rowKey={record => record.id}
                pagination={false}
              />
              <Pagination
                className="ant-table-pagination"
                defaultCurrent={1}
                total={fetchApplydata.count}
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
  const { fetchApplydata, page } = state.ApplyForRecords;
  return {
    loading: state.loading.models.ApplyForRecords,
    fetchApplydata,
    page
  };
}

export default connect(mapStateToProps)(ApplyForRecords);
