import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import SetForm from './SetForm';

function Set({dispatch , set}){
	function setform(values){
		new Promise((resolve, reject) => {
		   	dispatch({
		      type: 'Set/fetchSet',
		      payload: {
		      	values,
		      	resolve,
            reject,
		      }
		    })
	    }).then( res => {
	    		res.length?null:message.warning("当前云平台下没有可选择的商铺")
   			})
	 		.catch( err => {
		      		message.success(err);
	  		})

   		}
	
	return(
		<div>			
			  <Row>
			      <Col span={18} offset={3}>
			      		<h3>标题</h3>
			      		<SetForm onOk={setform} set={set}/>
			      </Col>
			    </Row>
			
		</div>
	)
}
function mapStateToProps(state) {
   const { set} = state.Set;
   return {
  		set
  };

}

export default connect(mapStateToProps)(Set);