import { Card, Button, Form, Input, Table, Space, Modal, message } from 'antd';
import { PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useState } from 'react';
import ImageUpload from '../../components/ImageUpload';

const MedicineCategories = () => {
  const [isModalShow, setIsModalShow] = useState(false);
  const [modalForm] = Form.useForm();

  return (
    <>
      <Card
        title="藥品分類"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsModalShow(true)} />
        }
      >
        <Space direction="vertical" style={{ width: '100%' }}>
          <Form
            layout="inline"
            onFinish={(v) => {
              message.success('查詢成功');
            }}
          >
            <Form.Item label="名稱" name="name">
              <Input placeholder="請輸入關鍵字" />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary" icon={<SearchOutlined />} />
            </Form.Item>
          </Form>
          <Table
            columns={[
              { title: '序號', width: 80, align: 'center' },
              { title: '名稱' },
              { title: '主圖', width: 120 },
              { title: '簡介' },
              { title: '操作', width: 110 },
            ]}
          />
        </Space>
      </Card>
      <Modal
        title="編輯"
        maskClosable={false}
        open={isModalShow}
        onCancel={() => setIsModalShow(false)}
        destroyOnClose
        onOk={() => {
          modalForm.submit();
        }}
      >
        <Form
          preserve={false}
          onFinish={(v) => {
            message.success('保存成功');
            console.log(v);
          }}
          labelCol={{ span: 3 }}
          form={modalForm}
        >
          <Form.Item label="名稱" name="name" rules={[{ required: true, message: '請輸入名稱' }]}>
            <Input placeholder="請輸入名稱" />
          </Form.Item>
          <Form.Item label="主圖">
            <ImageUpload />
          </Form.Item>
          <Form.Item label="簡介" name="desc">
            <Input.TextArea placeholder="請輸入名稱" />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default MedicineCategories;
