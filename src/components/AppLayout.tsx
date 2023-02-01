import React, { useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';

const { Header, Sider, Content } = Layout;

import logo from '../assets/logo.jpeg';

const AppLayout = ({ children }: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout style={{ width: '100vw', height: '100vh' }} id="components-layout-demo-custom-trigger">
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
        <div className="logo">
          <img src={logo} alt="好大夫" />
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <DashboardOutlined />,
              label: '看板',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: '藥品管理',
              children: [
                { label: '藥品分類', key: '/admin/medicine_categories' },
                { label: '藥品資訊', key: '/admin/medicines' },
              ],
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: '文章管理',
              children: [
                { label: '文章分類', key: '/admin/article_categories' },
                { label: '文章資訊', key: '/admin/articles' },
              ],
            },
            {
              key: '4',
              icon: <UserOutlined />,
              label: '會員資訊',
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
