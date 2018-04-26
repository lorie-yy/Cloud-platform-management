import { Table } from 'antd';

class EarnTable extends React.Component {

  render() {
    const { dataTableEarn } = this.props;
    const columns = [{
      title: 'username',
      dataIndex: 'username',
      key: 'username',
    }, {
      title: 'fanscount',
      dataIndex: 'fanscount',
      key: 'fanscount',
    }, {
      title: 'ownincome',
      dataIndex: 'ownincome',
      key: 'ownincome',
    }, {
      title: 'userincome',
      dataIndex: 'userincome',
      key: 'userincome',
    }];
    return (
      <div>
        <Table columns={columns}
          rowKey={record => record.username}
          dataSource={dataTableEarn} />
      </div>
    );
  }
}


export default EarnTable;
