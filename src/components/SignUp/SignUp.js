import React from 'react';
import { connect } from 'dva';
import { Row, Col,Card ,message} from 'antd';
import SingnUpForm from './SingnUpForm';

function SinUp({dispatch }){
	function loginUserList(values){
		new Promise((resolve, reject) => {
			dispatch({
		      type: 'SignUp/SignUp',
		      payload: {
		      	values,
		      	resolve,
		      	reject
		 	 }
	    })
	}).then( res => {
		console.log(res)
	      if(res.res == 0){
      		 	message.success("注册成功");
      		}else if(res.res == 2){
      			message.warning('用户已存在');
      		}else {
      			message.warning(res.res);
      		}
		})
 		.catch( err => {
 			message.error("出异常了")
  		})

	}
	return(
			<div>
				 <Card style={{textAlign: "center",margin:"0 0 50px 0"}} title="云商城注册"></Card>
				<Row>
				      <Col span={10} offset={6}>
				      		<SingnUpForm onOkList={loginUserList}></SingnUpForm>
				      </Col>
				</Row>
			</div>
		)
}

function mapStateToProps(state) {
   const { } = state.SignUp;
   return {
  };

}


export default connect(mapStateToProps)(SinUp);