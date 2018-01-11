import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './MainLayout.less';


function Header({ location }) {
  const testheader={
    letterSpacing:"5px"
  }
  const testStyle={
    letterSpacing:"48px"
  }
  return (
        <Menu
          selectedKeys={[location.pathname]}
          mode="inline"
          theme="dark"
          defaultSelectedKeys={['1']} mode="inline"
          style={{ lineHeight: '64px', height:"100%" ,borderRight: 0 }}
        >
         <Menu.Item key="/Home">
            <Link to="/"><Icon type="home" /><span style={testStyle}>首页</span></Link>
          </Menu.Item>
          <Menu.Item key="/Earn">
            <Link to="/Earn"><Icon type="pay-circle-o" /><span style={testStyle}>收益</span></Link>
          </Menu.Item>
          <Menu.Item key="/Thirdpartyconfig">
            <Link to="/Thirdpartyconfig"><Icon type="api" /><span>第三方配置</span></Link>
          </Menu.Item>
           <Menu.Item key="/Cloudconfig">
            <Link to="/Cloudconfig"><Icon type="cloud-upload" /><span>云平台配置</span></Link>
          </Menu.Item>
          <Menu.Item key="/Getshopid">
            <Link to="/Getshopid"><Icon type="key" /><span style={testheader}>配置折扣</span></Link>
          </Menu.Item>
          <Menu.Item key="/Withdrawal">
            <Link to="/Withdrawal"><Icon type="red-envelope" /><span style={testStyle}>提现</span></Link>
          </Menu.Item>
          <Menu.Item key="/ApplyForRecords">
            <Link to="/ApplyForRecords"><Icon type="exception" /><span style={testheader}>申请记录</span></Link>
          </Menu.Item>
          <Menu.Item key="/UserList">
            <Link to="/UserList"><Icon type="smile-o" /><span style={testheader}>用户详情</span></Link>
          </Menu.Item>
          <Menu.Item key="/SignUp">
            <Link to="/SignUp"><Icon type="plus-circle-o" /><span style={testStyle}>注册</span></Link>
          </Menu.Item>
        </Menu>
    
  );
}

export default Header;