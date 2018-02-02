import { DatePicker ,Select ,Form ,Button  } from 'antd';
import moment from 'moment';
import 'moment/locale/zh-cn';
moment.locale('zh-cn');
const { RangePicker } = DatePicker;
const Option = Select.Option;
const FormItem = Form.Item;

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class EarnSelect extends React.Component {
  // componentDidMount() {
  //   // To disabled submit button at the beginning.
  //   this.props.form.validateFields();
  // }

   handleSubmit = (e) => {
    const { onOk } = this.props;
    e.preventDefault();
    this.props.form.validateFields((err, fieldsValue) => {
      if (err) {
          return;
      }else if(!fieldsValue){
        const rangeValue = fieldsValue['date'];
        const values = {
            ...fieldsValue,
            'date': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')]       
          };
        onOk(values);
        console.log(values)
      }else{
        const rangeValue = fieldsValue['date'];
        const values = {
            ...fieldsValue,
            'date': [rangeValue[0].format('YYYY-MM-DD'), rangeValue[1].format('YYYY-MM-DD')]       
          };
        onOk(values);
         console.log(values)
        return false;
       
      }
      
       
    });
  }

  state = {
    size: 'default',
  };


  render() {
    const {datalist} = this.props
    const { getFieldDecorator,getFieldsError } = this.props.form;
    const { size } = this.state;
    const rangeConfig = {
      rules: [{ type: 'array', required: true, message: 'Please select time!' }],
    };
    let username;
    datalist?username = datalist.map(username=><Option key={username}>{username}</Option>):null;
    return (
      <div>
      <Form layout="inline" onSubmit={this.handleSubmit}>
              <FormItem>
                      {getFieldDecorator('username', {
                     
                      })(
                        <Select placeholder="请选择用户名"  style={{ width: 150 }} >
                           {username}
                        </Select>
                      )}
              </FormItem>
               <FormItem>
                      {getFieldDecorator('date', {
                        rules: [{ required: true, message: '请选择时间!' }],
                      
                      })(
                        <RangePicker size={size}
                           placeholder={['开始时间', '结束时间']} />
                      )}
              </FormItem>
       
             <FormItem>
                <Button
                  type="primary"
                  htmlType="submit"
                  disabled={hasErrors(getFieldsError())}
                >
                 确认
                </Button>
            </FormItem>
        </Form>
      </div>
    );
  }
}


export default Form.create()(EarnSelect);
