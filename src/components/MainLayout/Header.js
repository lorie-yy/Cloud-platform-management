import React from 'react';
import { Menu, Icon } from 'antd';
import { Link } from 'dva/router';
import styles from './MainLayout.less';


function Header({ location }) {
  const testheader={
    letterSpacing:"5px",
  }
  const testStyle={
    letterSpacing:"48px",
  }
  const link={
    paddingLeft: "24px",
  }
  return (
        <Menu
          selectedKeys={[location.pathname]}
          mode="inline"
          theme="dark"
          defaultSelectedKeys={['1']} mode="inline"
          style={{ padding: '16px 0', width: '100%' }}
        >
         <Menu.Item key="/Home">
            <Link style={link} to="/"><Icon type="home" /><span style={testStyle}>首页</span></Link>
          </Menu.Item>
          <Menu.Item key="/Earn">
            <Link style={link} to="/Earn"><Icon type="pay-circle-o" /><span style={testStyle}>收益</span></Link>
          </Menu.Item>
          <Menu.Item key="/Thirdpartyconfig">
            <Link style={link} to="/Thirdpartyconfig"><Icon type="api" /><span>第三方配置</span></Link>
          </Menu.Item>
           <Menu.Item key="/Cloudconfig">
            <Link style={link} to="/Cloudconfig"><Icon type="cloud-upload" /><span>云平台配置</span></Link>
          </Menu.Item>
          <Menu.Item key="/Getshopid">
            <Link style={link} to="/Getshopid"><Icon type="key" /><span style={testheader}>配置折扣</span></Link>
          </Menu.Item>
          <Menu.Item key="/Withdrawal">
            <Link style={link} to="/Withdrawal"><Icon type="red-envelope" /><span style={testStyle}>提现</span></Link>
          </Menu.Item>
          <Menu.Item key="/ApplyForRecords">
            <Link style={link} to="/ApplyForRecords"><Icon type="exception" /><span style={testheader}>申请记录</span></Link>
          </Menu.Item>
          <Menu.Item key="/UserList">
            <Link style={link} to="/UserList"><Icon type="smile-o" /><span style={testheader}>用户详情</span></Link>
          </Menu.Item>
          <Menu.Item key="/SignUp">
            <Link style={link} to="/SignUp"><Icon type="plus-circle-o" /><span style={testStyle}>注册</span></Link>
          </Menu.Item>
           <Menu.Item key="/Set">
            <Link style={link} to="/Set"><Icon type="setting" /><span style={testStyle}>设置</span></Link>
          </Menu.Item>
        </Menu>    
  );
}

export default Header;