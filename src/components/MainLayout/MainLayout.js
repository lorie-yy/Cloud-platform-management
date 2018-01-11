import React from 'react';
import styles from './MainLayout.less';
import Headerlist from './Header';
import { Layout,Row, Col ,Icon,Menu, Dropdown  } from 'antd';
const { Header, Sider, Content ,Footer } = Layout;

function MainLayout({ children, location }) {

  return (
     <Layout >
     	<Sider style={{}}
     	breakpoint="lg"
     	>
     		<div style={{ height: 80,color:"#fff", }} className="logo">
     		
     		</div>
     		<Headerlist className={styles.header} location={location} />
        </Sider>

	   	 <Layout>
	   	 	<Header style={{ background: '#fff', padding: 0 }}>
	   	 		<div>
			   	 	<h2 className={styles.heaerh2}>云平台收益管理平台</h2>
			   	 	<div className={styles.heaerspan} >
			   	 		<Menu>
						    <Menu.Item>
						      <a href="/">退出</a>
						    </Menu.Item>
						   
						  </Menu>
						
			   	 	</div>
	   	 		</div>
	   	 	
	   	 	</Header>
	    	 <Content style={{ margin: '40px 24px', padding: 24, background: '#fff', minHeight: 600 }}>
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