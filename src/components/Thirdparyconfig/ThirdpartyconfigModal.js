import React, { Component } from 'react';
import { Modal, Form, Input } from 'antd';

const FormItem = Form.Item;

class ThirdpartyModal extends Component {

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
    const { children } = this.props;
    const { getFieldDecorator } = this.props.form;
    const { thirdpartname, type, url } = this.props.record;
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span>
        <span onClick={this.showModelHandler}>
          {children}
        </span>
        <Modal title="修改" okText="确认" cancelText="取消" visible={this.state.visible} onOk={this.okHandler} onCancel={this.hideModelHandler} >
          <Form layout="horizontal" onSubmit={this.okHandler}>
            <FormItem
              {...formItemLayout}
              label="Name"
            >
              {
                getFieldDecorator('thirdpartname', {
                  rules: [{ required: true, pattern: /^[A-Za-z]+$/, message: '请输入正确的字母!' }],
                  initialValue: thirdpartname,
                })(<Input />)
              }
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="Type"
            >
              {
                getFieldDecorator('type', {
                  rules: [{ required: true, pattern: /^[0-9]?[1-9]$/, message: '请输入正整数' }],
                  initialValue: type,
                })(<Input type="number" />)
              }
            </FormItem>

            <FormItem
              {...formItemLayout}
              label="Url"
            >
              {
                getFieldDecorator('url', {
                  rules: [{ required: true, message: '请输入url!' }],
                  initialValue: url,
                })(<Input />)
              }
            </FormItem>
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(ThirdpartyModal);