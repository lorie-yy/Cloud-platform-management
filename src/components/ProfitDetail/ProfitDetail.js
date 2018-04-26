import React from 'react';
import { connect } from 'dva';
import { Table, Pagination, } from 'antd';


function ProfitDetail({ list: list, loading }) {

  const columns = [
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
      title: '总收益(元)',
      dataIndex: 'totalincome',
      key: 'totalincome',
    },
    {
      title: '可提现(元)',
      dataIndex: 'availablecash',
      key: 'availablecash',
    },
    {
      title: '已提现(元)',
      dataIndex: 'cashed',
      key: 'cashed',
    },
    {
      title: '折扣',
      dataIndex: 'discount',
      key: 'discount',
    },
  ];

  return (
    <div>
      <Table
        columns={columns}
        dataSource={list}
        loading={loading}
        rowKey={record => record.shopid}
        pagination={false}
      />

    </div>
  );
}


function mapStateToProps(state) {
  const { list } = state.ProfitDetail;
  return {
    loading: state.loading.models.ProfitDetail,
    list,
  };

}

export default connect(mapStateToProps)(ProfitDetail);