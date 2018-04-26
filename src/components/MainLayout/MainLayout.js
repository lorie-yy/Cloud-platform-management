import React from 'react';
import styles from './MainLayout.less';
import Headerlist from './Header';
import { Link } from 'dva/router';
import { Layout, Row, Col, Icon, Menu, Dropdown } from 'antd';
const { Header, Sider, Content, Footer } = Layout;

function MainLayout({ children, location }) {

  return (
    <Layout >
      <Sider className={styles.sider}
        breakpoint="lg"
        width={256}
      >
        <div className={styles.logo} key="logo">
          <Link to="/">
            <h1>云平台收益管理平台</h1>
          </Link>
        </div>
        <Headerlist className={styles.header} location={location} />
      </Sider>

      <Layout>
        <Header style={{ background: '#fff', padding: 0 }}>
          <div>
            <div className={styles.heaerspan} >
              <Menu>
                <Menu.Item>
                  <a href="/">退出</a>
                </Menu.Item>

              </Menu>

            </div>
          </div>

        </Header>
        <Content style={{ margin: '24px 24px 0', padding: 24, background: '#fff', minHeight: '100%', height: '100%' }}>
          <div className={styles.content}>
            <div className={styles.main}>
              {children}
            </div>
          </div>
        </Content>
      </Layout>

    </Layout>




  );
}

export default MainLayout;