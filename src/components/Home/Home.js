import React from 'react';
import { connect } from 'dva';
import { Card,Row, Col} from 'antd';
import { routerRedux  } from 'dva/router';
import { Chart, Axis, Geom, Tooltip,Guide } from 'bizcharts';
import { View } from '@antv/data-set';



function Home({HomeData,dataSourcename,myDateArr}){

	

	// let content = [{
	//     name: '内容一',
	//     date: 'neirong 2'
	// }];
	
	// writeExcel('总收益', headers, content);

	// ownincome 今日总收益
	// const data = [
	// 	{ name: '李聪',  date: '2018-01-08', licong: 6.56,licong1:13,licong22:9,licong3:19,admin:1,boda:10,licong18:20 },
	// 	{ name: '李聪1', date: '2018-01-09', licong: 3.66,licong1:8,licong22:16,licong3:23,admin:6,boda:10,licong18:20 },
	// 	{ name: '李聪3', date: '2018-01-10', licong: 13.76,licong1:25,licong22:12,licong3:2,admin:15,boda:10,licong18:20 },
	// 	{ name: '李聪4', date: '2018-01-11', licong: 3.86,licong1:15,licong22:7,licong3:2,admin:12.5 ,boda:6,licong18:15},
	// 	{ name: '李聪5', date: '2018-01-12', licong: 20.96,licong1:5,licong22:9,licong3:12,admin:16.6 ,boda:10,licong18:20},
	// 	{ name: '李聪6', date: '2018-01-13', licong: 4.11,licong1:9,licong22:11,licong3:16,admin:19.9 ,boda:10,licong18:20},
	// 	{ name: '李聪7', date: '2018-01-14', licong: 5.65,licong1:6,licong22:16,licong3:9,admin:8,boda:10,licong18:20},
	// ];

	let content = myDateArr;

	///分割线--------------------------------------------------------------------------------
	
	const data =myDateArr

	const {DataSet} = View;
	 
	var list = HomeData.lastweeklydate;	 

	const ds = new DataSet();
	const dv = ds.createView().source(data);
	dv.transform({
		type: 'fold',
		fields: dataSourcename, // 展开字段集
		key: 'money', // key字段
		value: 'earnings', // value字段
	});

	const cols = {
		date: {
		  range: [ 0, 1 ]
		}
	}
	const gridStyle = {
		textAlign: 'center',
	};
	
	return(
		<div>
			<Row gutter={16}>
		      <Col className="gutter-row"  span={4}>
		      	<Card style={gridStyle} title="今日总收益" bordered={true}>{HomeData.owntodayincome}元</Card>
		      </Col>
		      <Col className="gutter-row" span={4}>
		      	<Card style={gridStyle} title="总收益" bordered={true}>{HomeData.owntotalincome}元</Card>
		      </Col>
		      <Col className="gutter-row" span={4}>
		      	<Card style={gridStyle}  title="用户今日收益" bordered={true}>{HomeData.usertodayincome}元</Card>
		      </Col>
		      <Col className="gutter-row" span={4}>
		      	<Card style={gridStyle} title="用户总收益" bordered={true}>{HomeData.usertotalincome}</Card>
		      </Col>
		      <Col className="gutter-row" span={4}>
		      	<Card style={gridStyle} title="今日粉丝数" bordered={true}>{HomeData.todayfansnum}</Card>
		      </Col>
		      
		      <Col className="gutter-row" span={4}>
		      	<Card style={gridStyle} title="总粉丝数" bordered={true}>{HomeData.totalfansnum}</Card>
		      </Col>
		    </Row>
		 <Row>
		 	<Col span={24}>
		  		<h4 style={{color:"#07a",padding:"30px 0 0 0",textAlign:'center'}}>最近7日的收益及粉丝数</h4>
		  		   	
				  <Chart height={400} data={dv} scale={cols} forceFit>
				  	  <Axis name="date" />
			          <Axis name="earnings" label={{formatter: val => `${val}元`}}/>

			          <Tooltip title={null} crossLine={{ stroke: '#f00' }} />

			          <Geom type="line" position="date*earnings" size={2} color={'money'} shape={'smooth'} />
			          <Geom type='point' position="date*earnings" size={4} shape={'circle'} color={'money'} style={{ stroke: '#fff', lineWidth: 1}} />
		        </Chart>
        	</Col>
        	
        </Row>
		</div>
	)
}
function mapStateToProps(state) {
   const { HomeData,dataSourcename,myDateArr} = state.Home;
   return {
   	HomeData,
   	dataSourcename,
   	myDateArr
  };

}

export default connect(mapStateToProps)(Home);