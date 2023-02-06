import { Card, Button, Form, Input, Table, Space, Modal, message, Popconfirm } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import ImageUpload from '../../components/ImageUpload';
import {
  loadDataAPI,
  insertAPI,
  updateByIdAPI,
  delByIdAPI,
} from '../../services/medicine-categories';
import { delImg } from '../../utils/tools';

const MedicineCategories = () => {
  const [isModalShow, setIsModalShow] = useState(false);
  const [modalForm] = Form.useForm();
  const [query, setQuery] = useState({});
  const [medicineCategories, setMedicineCategories] = useState([]);
  const [currentID, setCurrentID] = useState(''); // 若為空則為新增
  const [total, setTotal] = useState(0);
  const [imageUrl, setImageUrl] = useState<string>('');

  useEffect(() => {
    loadDataAPI(query).then((res) => {
      setMedicineCategories(res.data.list);
      setTotal(res.data.total);
    });
  }, [query]);

  useEffect(() => {
    if (!isModalShow) {
      setCurrentID('');
      setImageUrl('');
    }
  }, [isModalShow]);

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
              setQuery(v);
            }}
          >
            <Form.Item label="名稱" name="name">
              <Input placeholder="請輸入關鍵字" allowClear />
            </Form.Item>
            <Form.Item>
              <Button htmlType="submit" type="primary" icon={<SearchOutlined />} />
            </Form.Item>
          </Form>
          <Table
            dataSource={medicineCategories}
            rowKey="id"
            columns={[
              {
                title: '序號',
                width: 80,
                align: 'center',
                render(v, r, i) {
                  return <>{i + 1}</>;
                },
              },
              { title: '名稱', dataIndex: 'name', width: 180 },
              {
                title: '主圖',
                width: 120,
                align: 'center',
                render(v, r: any) {
                  return <img src={delImg(r.image)} alt={r.name} className="t-img" />;
                },
              },
              { title: '簡介', dataIndex: 'desc' },
              {
                title: '操作',
                width: 110,
                align: 'center',
                render(v, r: any) {
                  return (
                    <Space>
                      <Button
                        type="primary"
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => {
                          setIsModalShow(true);
                          setCurrentID(r.id);
                          setImageUrl(r.image);
                          modalForm.setFieldsValue(r);
                        }}
                      />
                      <Popconfirm
                        title="確定是否刪除？"
                        onConfirm={async () => {
                          await delByIdAPI(r.id);
                          setQuery({});
                        }}
                      >
                        <Button danger icon={<DeleteOutlined />} size="small" />
                      </Popconfirm>
                    </Space>
                  );
                },
              },
            ]}
            pagination={{
              total,
              onChange(page) {
                setQuery({
                  ...query,
                  page,
                });
              },
            }}
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
          onFinish={async (v) => {
            if (currentID) {
              await updateByIdAPI(currentID, { ...v, image: imageUrl });
            } else {
              await insertAPI({ ...v, image: imageUrl });
            }
            message.success('保存成功');
            setIsModalShow(false);
            // reset 搜尋條件, 重新取資料
            setQuery({});
          }}
          labelCol={{ span: 3 }}
          form={modalForm}
        >
          <Form.Item label="名稱" name="name" rules={[{ required: true, message: '請輸入名稱' }]}>
            <Input placeholder="請輸入名稱" />
          </Form.Item>
          <Form.Item label="主圖">
            <ImageUpload imageUrl={imageUrl} setImageUrl={setImageUrl} />
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
