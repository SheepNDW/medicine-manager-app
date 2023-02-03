import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import { Dropdown, Layout, Menu, message, theme } from 'antd';

const { Header, Sider, Content } = Layout;

import { defaultImg as logo } from '../utils/tools';

const sideMenuData = [
  {
    key: '/admin/dashboard',
    icon: <DashboardOutlined />,
    label: '看板',
  },
  {
    key: '/admin/medicine',
    icon: <VideoCameraOutlined />,
    label: '藥品管理',
    children: [
      { label: '藥品分類', key: '/admin/medicine/categories' },
      { label: '藥品資訊', key: '/admin/medicine/list' },
    ],
  },
  {
    key: '/admin/articles',
    icon: <UploadOutlined />,
    label: '文章管理',
    children: [
      { label: '文章分類', key: '/admin/articles/categories' },
      { label: '文章資訊', key: '/admin/articles/list' },
    ],
  },
  {
    key: '/admin/users',
    icon: <UserOutlined />,
    label: '會員資訊',
  },
];

const findOpenKeys = (key: string) => {
  const result: string[] = [];
  const findInfo = (arr: any[]) => {
    arr.forEach((item) => {
      if (key.includes(item.key)) {
        result.push(item.key);
        if (item.children) {
          // 遞迴查詢頁面刷新後預設選中項
          findInfo(item.children);
        }
      }
    });
  };
  findInfo(sideMenuData);
  return result;
};

const AppLayout = ({ children }: any) => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const tempOpenKeys = findOpenKeys(pathname);

  return (
    <Layout style={{ width: '100vw', height: '100vh' }} id="components-layout-demo-custom-trigger">
      <Sider trigger={null} collapsible collapsed={collapsed} theme="light">
        <div className="logo">
          <img src={logo} alt="好大夫" />
        </div>
        <Menu
          theme="light"
          mode="inline"
          defaultOpenKeys={tempOpenKeys}
          defaultSelectedKeys={tempOpenKeys}
          onClick={({ key }) => {
            navigate(key);
          }}
          items={sideMenuData}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
          <span className="app-title">好大夫管理平臺系統</span>
          <Dropdown
            menu={{
              items: [
                { label: '個人中心', key: 'userCenter' },
                { label: '退出', key: 'logOut' },
              ],
              onClick: ({ key }) => {
                if (key === 'logOut') navigate('/');
                else message.info('暫未開通');
              },
            }}
          >
            <img
              src={logo}
              style={{
                width: '30px',
                borderRadius: '50%',
                float: 'right',
                marginTop: '1rem',
                marginRight: '20px',
              }}
            />
          </Dropdown>
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
