import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import { ConfigProvider, theme } from 'antd';
import zhTW from 'antd/locale/zh_TW';
import App from './App';
import 'antd/dist/reset.css';
import './index.css';

// import Dashboard from './pages/Dashboard';
// import Users from './pages/Users';
// import ArticleList from './pages/articles/List';
// import ArticleCategories from './pages/articles/Categories';
// import MedicineList from './pages/medicine/List';
// import MedicineCategories from './pages/medicine/Categories';
import Login from './pages/Login';
import AppProvider, { context } from './components/AppProvider';
import { useContext } from 'react';

const MainRouter = () => {
  const { routes } = useContext(context);
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
      // children: [
      //   { path: 'dashboard', element: <Dashboard /> },
      //   { path: 'users', element: <Users /> },
      //   { path: 'articles/list', element: <ArticleList /> },
      //   { path: 'articles/categories', element: <ArticleCategories /> },
      //   { path: 'medicine/list', element: <MedicineList /> },
      //   { path: 'medicine/categories', element: <MedicineCategories /> },
      // ],
      children: routes.map((item: any) => {
        return {
          path: item.key.replace('/admin/', ''),
          element: item.element,
        };
      }),
    },
  ]);

  return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <AppProvider>
    <MainRouter />
  </AppProvider>
);
