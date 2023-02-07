import { Button, Card, Col, Form, Input, message, Row } from 'antd';
import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { context } from '../components/AppProvider';
import { loginAPI } from '../services/auth';
import { defaultImg, setToken } from '../utils/tools';

const Login = () => {
  const navigate = useNavigate();
  const { resetMenus } = useContext(context);

  return (
    <Row>
      <Col
        md={{
          span: 8,
          push: 8,
        }}
        xs={{
          span: 22,
          push: 1,
        }}
      >
        <img
          src={defaultImg}
          style={{
            display: 'block',
            margin: '20px auto',
            borderRadius: '16px',
            width: '200px',
          }}
        />

        <Card title="好大夫管理平臺系統">
          <Form
            labelCol={{
              md: {
                span: 4,
              },
            }}
            autoComplete="off"
            onFinish={async (v) => {
              const res = await loginAPI(v);

              if (res.success) {
                message.success('登入成功！');
                setToken(res.data);
                resetMenus('admin');
                navigate('/admin/dashboard');
              } else {
                message.error(res.errorMessage);
              }
            }}
          >
            <Form.Item
              label="帳號"
              name="userName"
              rules={[
                {
                  required: true,
                  message: '請輸入使用者名稱',
                },
              ]}
            >
              <Input placeholder="請輸入使用者名稱" />
            </Form.Item>
            <Form.Item
              label="密碼"
              name="password"
              rules={[
                {
                  required: true,
                  message: '請輸入密碼',
                },
              ]}
            >
              <Input.Password placeholder="請輸入密碼" />
            </Form.Item>
            <Form.Item>
              <Button
                htmlType="submit"
                type="primary"
                style={{
                  display: 'block',
                  margin: '8px auto',
                  width: '20vw',
                }}
              >
                登入
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Col>
    </Row>
  );
};

export default Login;
