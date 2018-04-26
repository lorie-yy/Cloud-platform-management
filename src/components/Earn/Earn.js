import React from 'react';
import styles from './Earn.less';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Alert, Table, Pagination, Tabs, Button, Icon, Row, Col } from 'antd';

// import Excel from 'exceljs/dist/es5/exceljs.browser'
import FileSaver from "file-saver";

import { PAGE_SIZE } from '../../constants';
import EarnSelect from './EarnSelect';
import EarnTable from './EarnTable';
const TabPane = Tabs.TabPane;



function Earn({ dispatch, list, count, page, datatable, dataTableEarn, loading }) {

  function writeExcel(filename, headers, content) {

    if (!filename) {
      filename = 'Untitled';
    }

    let workbook = new Excel.Workbook();

    let d = new Date();
    workbook.created = d;
    workbook.modified = d;

    let sheet = workbook.addWorksheet('总收益');

    sheet.columns = headers;

    for (let item of content) {
      sheet.addRow(item);
    }
    return workbook.xlsx.writeBuffer().then(function (buffer) {
      FileSaver.saveAs(
        new Blob([buffer], {
          type: "application/octet-stream"
        }),
        "总收益.xlsx"
      );
    });
  }

  let headers = [{
    header: '用户名',
    key: 'username',
    width: 15
  }, {
    header: '总收益(元)',
    key: 'totalincome',
    width: 15
  },
  {
    header: '可提现(元)',
    key: 'availablecash',
    width: 15
  },
  {
    header: '折扣',
    key: 'discount',
    width: 15
  }];

  let content = datatable;


  let datalist = [];
  if (!datatable) {

  } else {
    for (let i = 0; i < datatable.length; i++) {
      datalist.push(datatable[i].username)
    }

  }
  datalist = [...new Set(datalist)]

  function pageChangeHandler(page) {
    dispatch(routerRedux.push({
      pathname: '/Earn',
      search: '?page=' + page,
    }));
  }

  function getShopidlist(value) {
    dispatch({
      type: '',
      payload: {},
    });

  }

  function viewmore(value) {
    dispatch(routerRedux.push({
      pathname: '/ProfitDetail',
      search: '?value=' + value,
    }));
  }

  function datelist(values) {
    dispatch({
      type: 'Earn/dateearn',
      payload: values,
    });

  }

  function getShopid(value) {

  }

  function callback(key) {
    console.log(key);
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
    <div className={styles.normal}>

      <Tabs defaultActiveKey="1" onChange={callback}>
        <TabPane tab="总收益" key="1">
          <div>
            <Row>
              <Col span={1} offset={21}>
                <Button onClick={writeExcel.bind(null, '总收益', headers, content)} type="primary" icon="download" size={'large'}>Download</Button>
              </Col>
            </Row>
            <Table
              columns={columns}
              dataSource={datatable}
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
        </TabPane>
        <TabPane tab="收益查询" key="2">
          <div className={styles.earntoday}>
            <EarnSelect datalist={datalist} onOk={datelist}></EarnSelect>
            <EarnTable dataTableEarn={dataTableEarn}></EarnTable>
          </div>
        </TabPane>
      </Tabs>



    </div>
  );
}

function mapStateToProps(state) {
  const { list, count, page, datatable, dataTableEarn } = state.Earn;
  return {
    loading: state.loading.models.Earn,
    list,
    count,
    page,
    datatable,
    dataTableEarn
  };

}

export default connect(mapStateToProps)(Earn);