import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Breadcrumb, Dropdown, Layout, Menu, message, theme } from 'antd';

const { Header, Sider, Content } = Layout;

import { defaultImg as logo } from '../utils/tools';
import { context } from './AppProvider';

const findOpenKeys = (key: string, menus: any) => {
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
  findInfo(menus);
  return result;
};

const findDeepPath = (key: string, menus: any) => {
  const result: any[] = [];

  const findInfo = (arr: any[]) => {
    arr.forEach((item) => {
      const { children, ...info } = item;
      result.push(info);
      if (children) {
        findInfo(children);
      }
    });
  };
  findInfo(menus);
  const tempData = result.filter((item) => key.includes(item.key));
  if (tempData.length > 0) {
    return [{ label: '首頁', key: '/admin/dashboard' }, ...tempData];
  }
  return [];
};

const AppLayout = ({ children }: any) => {
  const { menus } = useContext(context);

  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const [breadcrumbs, setBreadcrumbs] = useState<any[]>([]);

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const tempOpenKeys = findOpenKeys(pathname, menus);

  useEffect(() => {
    setBreadcrumbs(findDeepPath(pathname, menus));
  }, [pathname]);

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
          items={menus}
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
            overflow: 'auto',
          }}
        >
          <Breadcrumb>
            {breadcrumbs.map((item) => (
              <Breadcrumb.Item key={item.key}>{item.label}</Breadcrumb.Item>
            ))}
          </Breadcrumb>
          {children}
        </Content>
      </Layout>
    </Layout>
  );
};

export default AppLayout;
