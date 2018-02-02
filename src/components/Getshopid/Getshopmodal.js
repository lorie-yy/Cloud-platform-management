import React, { Component } from 'react';
import {Select, Modal, Form, Input ,Radio } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;



class Getshopedit extends Component {

  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      getcoloud:[],
      value: 1,
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

  onSecondCityChange = (value) => {
    this.props.addTodo(value)
  }
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
    const { children ,getshopidSelect, getcoloud} = this.props;
    const { getFieldDecorator , getFieldValue } = this.props.form;
    const { cloudid, shopid , flag,discountmodal } = this.props.record;
    var cityOptions;
    getcoloud?cityOptions = getcoloud.map(city=><Option key={city}>{city}</Option>):null;
    
    var getshoplistid;
    getshopidSelect?getshoplistid=getshopidSelect.map(code=><Option key={code}>{code}</Option>):null
        
    const formItemLayout = {
      labelCol: { span: 6 },
      wrapperCol: { span: 14 },
    };

    return (
      <span>
        <span onClick={this.showModelHandler}>
          { children }
        </span>
        <Modal title="修改"  okText="确认" cancelText="取消"  visible={this.state.visible} onOk={this.okHandler} onCancel={this.hideModelHandler} >
          <Form layout="horizontal" onSubmit={this.okHandler}>
              {getcoloud?
              <FormItem {...formItemLayout} label="云平台编号">
         
                  {getFieldDecorator('cloudid', {
                    rules: [{ required: true, message: '请选择第云平台编号' }],
                  })(
                    <Select placeholder="请选择第云平台编号"  style={{ width: 275 }} onChange={this.onSecondCityChange}>
                         {cityOptions}
                    </Select>
                  )}
                </FormItem>:null
            }
            {cloudid?
                <FormItem {...formItemLayout} label="云平台编号">
                  {
                    getFieldDecorator('cloudid', {
                      initialValue: cloudid,
                    })(<Input disabled={true} />)
                  }
                </FormItem>:
                null
            }

            {shopid>=0?
                <FormItem {...formItemLayout} label="商铺ID">
                  {
                    getFieldDecorator('shopid', {
                      initialValue: shopid,
                    })(<Input disabled={true}/>)
                  }
                </FormItem>:null
            }
            {getcoloud? 
                <FormItem {...formItemLayout} label="请选择商铺id">
                  {getFieldDecorator('shopid', {
                    rules: [{ required: true, message: '请选择商铺id!' }],
                  })(
                    <Select placeholder="请选择商铺id"  style={{ width: 275 }} onChange={this.handleProvinceChange}>
                      {getshoplistid}
                    </Select>
                  )}
                </FormItem>
              :null

            }
            <div style={{margin:"0 auto",textAlign: "center"}}>
                {getFieldDecorator('public', {
                  initialValue: flag,
                })(
                  <Radio.Group>
                    <Radio value="1">一口价</Radio>
                    <Radio value="0">折扣</Radio>
                  </Radio.Group>
                )}
                 <FormItem
                    {...formItemLayout}
                    label="分成"
                     style={{
                        margin: '8px 0',
                      }}
                  >
                    {
                      getFieldDecorator('bonus', {
                        rules: [{ required: true,pattern:/^0+[.]+[1-9]$/, message: '请输入0-1之间的数' }],
                        initialValue: discountmodal,
                      })(<Input/>)
                    }
                </FormItem>


               
              </div>          
     
          </Form>
        </Modal>
      </span>
    );
  }
}

export default Form.create()(Getshopedit);
