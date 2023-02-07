import { createContext, useState } from 'react';
import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
  DashboardOutlined,
} from '@ant-design/icons';
import Dashboard from '../pages/Dashboard';
import MedicineCategories from '../pages/medicine/Categories';
import MedicineList from '../pages/medicine/List';
import ArticleCategories from '../pages/articles/Categories';
import ArticleList from '../pages/articles/List';
import Users from '../pages/Users';

export const context = createContext<any>({});

const sideMenuData = [
  {
    key: '/admin/dashboard',
    icon: <DashboardOutlined />,
    element: <Dashboard />,
    label: '看板',
  },
  {
    key: '/admin/medicine',
    icon: <VideoCameraOutlined />,
    label: '藥品管理',
    roles: ['admin', 'editor'],
    children: [
      {
        label: '藥品分類',
        key: '/admin/medicine/categories',
        element: <MedicineCategories />,
        roles: ['admin'],
      },
      {
        label: '藥品資訊',
        key: '/admin/medicine/list',
        element: <MedicineList />,
        roles: ['admin', 'editor'],
      },
    ],
  },
  {
    key: '/admin/articles',
    icon: <UploadOutlined />,
    label: '文章管理',
    roles: ['admin', 'editor'],
    children: [
      {
        label: '文章分類',
        key: '/admin/articles/categories',
        element: <ArticleCategories />,
        roles: ['admin', 'editor'],
      },
      {
        label: '文章資訊',
        key: '/admin/articles/list',
        element: <ArticleList />,
        roles: ['admin', 'editor'],
      },
    ],
  },
  {
    key: '/admin/users',
    icon: <UserOutlined />,
    element: <Users />,
    label: '會員資訊',
    roles: ['admin', 'service'],
  },
];

function findRoles(role: string) {
  const result: any[] = [];

  findInfo(sideMenuData);
  function findInfo(data: any[], parent: any = null) {
    data.forEach((item) => {
      const { children, ...info } = item;
      if (children) {
        info.children = [];
        findInfo(children, info.children);
        if (info.children.length === 0) delete info.children;
      }
      if (info.roles) {
        if (info.roles.includes(role)) parent ? parent.push(info) : result.push(info);
      } else {
        parent ? parent.push(info) : result.push(info);
      }
    });
  }

  return result;
}

function flatRoutes(menus: any[]) {
  const result: any[] = [];

  function findInfo(data: any[]) {
    data.forEach((item) => {
      const { children, ...info } = item;
      result.push(info);
      if (children) {
        findInfo(children);
      }
    });
  }
  findInfo(menus);

  return result;
}

const AppProvider = ({ children }: any) => {
  let defaultMenus = [];
  let defaultRoutes = [];
  const oldRole = sessionStorage.getItem('role');
  if (oldRole) {
    defaultMenus = findRoles(oldRole);
    defaultRoutes = flatRoutes(defaultMenus);
  }
  const [menus, setMenus] = useState(defaultMenus);
  const [routes, setRoutes] = useState(defaultRoutes);

  const resetMenus = (role: string) => {
    sessionStorage.setItem('role', role);
    const tempMenu = findRoles(role);
    setMenus(tempMenu);
    setRoutes(flatRoutes(tempMenu));
  };

  return <context.Provider value={{ menus, routes, resetMenus }}>{children}</context.Provider>;
};

export default AppProvider;
