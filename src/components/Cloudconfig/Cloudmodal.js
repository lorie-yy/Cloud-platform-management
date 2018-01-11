import React, { Component } from 'react';
import {Select, Modal, Form, Input } from 'antd';
const Option = Select.Option;

const FormItem = Form.Item;

class Cloudedit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }

  showModelHandler = (e) => {

    if (e) e.stopPropagation();
    this.setState({
      visible: true,
    });
  };

  hideModelHandler = () => {
    this.setState({
      visible: false,
    });
  };
  //新建一条数据
  okHandler = () => {
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
        this.hideModelHandler();
      }
    });
  };

  render() {
    const CountApp = ({count, dispatch}) => {
      return (
        <div className={styles.normal}>
          <div className={styles.record}>Highest Record: {count.record}</div>
          <div className={styles.current}>{count.current}</div>
          <div className={styles.button}>
            <button onClick={() => { dispatch({type: 'count/add'}); }}>+</button>
          </div>
        </div>
      );
    };
    const { children ,thirdpartdatals ,Clouddatals } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { cloudname, thirdpart_name, cloudid } = this.props.record;
    const provinceOptions = thirdpartdatals.map(province => <Option key={province}>{province}</Option>);
    let coldIdname;
    if(Clouddatals){
       coldIdname = Clouddatals.map(code => <Option key={code}>{code}</Option>);
    }
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal title="修改" okText="确认" cancelText="取消" visible={this.state.visible} onOk={this.okHandler} onCancel={this.hideModelHandler} >
          <Form layout="horizontal" onSubmit={this.okHandler}>
          {cloudname?
              <FormItem {...formItemLayout} label="云平台名称">
                  {
                      getFieldDecorator('cloudname', {
                        initialValue: cloudname,
                      })(<Input disabled={true} />)
                  }
              </FormItem>:null
            }
            {Clouddatals?
                <FormItem {...formItemLayout} label="云平台名称">
                    {getFieldDecorator('cloudid', {
                      rules: [{ required: true, message: '请选择云平台!' }],
                    })(
                    <Select placeholder="请选择云平台"  style={{ width: 300 }} onChange={this.onSecondCityChange}>
                        {coldIdname}
                    </Select>
                  )}
            </FormItem>:null
            }

            {cloudid?
                  <FormItem {...formItemLayout} label="云平台Id">
                      {
                          getFieldDecorator('cloudid', {
                            initialValue: cloudid,
                          })(<Input disabled={true}/>)
                       }
                  </FormItem>:null
            }

             <FormItem
              {...formItemLayout}
              label="第三方名称"
            >

            {getFieldDecorator('thirdpart', {
              rules: [{ required: true, message: '第三方名称!' }],
            })(
              <Select placeholder={thirdpart_name}  style={{ width: 285 }} onChange={this.handleProvinceChange}>
                {provinceOptions}
              </Select>
            )}
            </FormItem>

           
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(Cloudedit);
