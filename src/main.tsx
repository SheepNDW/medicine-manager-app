import ReactDOM from 'react-dom/client';
import { ConfigProvider, theme } from 'antd';
import zhTW from 'antd/locale/zh_TW';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';
import 'antd/dist/reset.css';
import './index.css';

const router = createBrowserRouter([
  {
    path: '/',
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
  },
]);

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <RouterProvider router={router} />
);
