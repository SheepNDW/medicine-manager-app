import { Card, Button, Form, Input, Table, Space, Modal, message, Popconfirm, Select } from 'antd';
import { DeleteOutlined, EditOutlined, PlusOutlined, SearchOutlined } from '@ant-design/icons';
import { useEffect, useState } from 'react';
import ImageUpload from '../../components/ImageUpload';
import { loadDataAPI, insertAPI, updateByIdAPI, delByIdAPI } from '../../services/medicines';
import { loadDataAPI as loadCategoriesAPI } from '../../services/medicine-categories';
import { delImg } from '../../utils/tools';

const MedicineList = () => {
  const [isModalShow, setIsModalShow] = useState(false);
  const [modalForm] = Form.useForm();
  const [query, setQuery] = useState({});
  const [medicineList, setMedicineList] = useState([]);
  const [currentID, setCurrentID] = useState(''); // 若為空則為新增
  const [total, setTotal] = useState(0);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    loadDataAPI(query).then((res) => {
      setMedicineList(res.data.list);
      setTotal(res.data.total);
    });
  }, [query]);

  useEffect(() => {
    if (!isModalShow) {
      setCurrentID('');
      setImageUrl('');
    }
  }, [isModalShow]);

  useEffect(() => {
    loadCategoriesAPI({ per: 100 }).then((res) => {
      setCategories(res.data.list);
    });
  }, []);

  return (
    <>
      <Card
        title="藥品資訊"
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
            dataSource={medicineList}
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
                title: '分類',
                width: 180,
                align: 'center',
                render(v, r: any) {
                  return <>{r.category?.name || '暫無'}</>;
                },
              },
              {
                title: '主圖',
                width: 120,
                align: 'center',
                render(v, r: any) {
                  return <img src={delImg(r.image)} alt={r.name} className="t-img" />;
                },
              },
              { title: '價格', dataIndex: 'price' },
              { title: '庫存', dataIndex: 'amount' },
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
              showSizeChanger: false,
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
          <Form.Item label="分類" name="medicineCategoryId">
            <Select allowClear>
              {categories.map((item: MedicineInfo.Category) => (
                <Select.Option value={item.id} key={item.id}>
                  {item.name}
                </Select.Option>
              ))}
            </Select>
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

export default MedicineList;
