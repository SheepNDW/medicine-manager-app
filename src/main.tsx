import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ConfigProvider, theme } from 'antd';
import zhTW from 'antd/locale/zh_TW';
import App from './App';
import 'antd/dist/reset.css';
import './index.css';

import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import AppLayout from './components/AppLayout';
import Users from './pages/Users';
import ArticleList from './pages/articles/List';
import ArticleCategories from './pages/articles/Categories';
import MedicineList from './pages/medicine/List';
import MedicineCategories from './pages/medicine/Categories';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '/admin',
    element: (
      <ConfigProvider
        locale={zhTW}
        theme={{
          algorithm: theme.compactAlgorithm,
        }}
      >
        <App />
      </ConfigProvider>
    ),
    children: [
      { path: 'dashboard', element: <Dashboard /> },
      { path: 'users', element: <Users /> },
      { path: 'articles/list', element: <ArticleList /> },
      { path: 'articles/categories', element: <ArticleCategories /> },
      { path: 'medicine/list', element: <MedicineList /> },
      { path: 'medicine/categories', element: <MedicineCategories /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
);
