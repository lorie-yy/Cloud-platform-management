import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Table, Badge, Menu, Dropdown, Icon, Pagination } from 'antd';
import { PAGE_SIZE } from '../../constants';

function UserList({ UserData, userhome, page, loading, dispatch }) {

  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/UserList',
      search: '?page=' + page,
    }));
  }
  const expandedRowRender = (record) => {
    const columns = [
      { title: '云平台编号', dataIndex: 'name', key: 'name' },
      { title: '商铺id', dataIndex: 'cloud', key: 'cloud' },
    ];
    const data = [];

    for (let i = 0; i < record.cloud.length; ++i) {
      data.push({
        key: i,
        name: record.cloud[i].cloudid,
        cloud: record.cloud[i].shopid
      });
    }
    return (
      <div>
        <Table
          columns={columns}
          dataSource={data}
          pagination={false}
        />

      </div>
    );
  };

  const columns = [
    { title: ' ', dataIndex: 'name', key: 'name' },
  ];

  const data = [];

  for (let i = 0; i < userhome.length; ++i) {


    data.push({
      key: userhome[i].username,
      name: userhome[i].username,
      cloud: userhome[i].cloud
    });
  }

  return (
    <div>
      <Table
        className="components-table-demo-nested"
        loading={loading}
        columns={columns}
        expandedRowRender={expandedRowRender}
        dataSource={data}
        pagination={false}
      />
      <Pagination
        className="ant-table-pagination"
        defaultCurrent={1}
        total={UserData.count}
        current={page}
        pageSize={UserData.page_size}
        onChange={pageChangeHandler}
      />
    </div>
  )
}
// expandedRowRender={expandedRowRender}
function mapStateToProps(state) {
  const { UserData, userhome, page } = state.UserList;
  return {
    loading: state.loading.models.UserList,
    UserData,
    userhome,
    page

  };

}

export default connect(mapStateToProps)(UserList);