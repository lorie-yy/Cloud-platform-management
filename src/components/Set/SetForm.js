import { Form, Icon, Input, Button, Checkbox } from 'antd';
const FormItem = Form.Item;
const { TextArea } = Input;

class SetForm extends React.Component {
  handleSubmit = (e) => {
    e.preventDefault();
    const { onOk } = this.props;
    this.props.form.validateFields((err, values) => {
      if (!err) {
        onOk(values);
      }
    });
  }
  render() {
    const { getFieldDecorator } = this.props.form;
    const { set } = this.props;
    const { title, detail } = set
    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('title', {
            rules: [{ required: true, message: '请输入标题!' }],
            initialValue: title,
          })(
            <Input placeholder="关于。。。内容" />
          )}
        </FormItem>
        <h3>内容</h3>


        <FormItem>
          {getFieldDecorator('detail', {
            rules: [{ required: true, message: '请输入内容!' }],
            initialValue: detail,
          })(
            <TextArea placeholder="随便写点东西……" rows={10} />
          )}
        </FormItem>

        <FormItem>

          <Button type="primary" htmlType="submit" className="login-form-button">
            提交
          </Button>

        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(SetForm);
