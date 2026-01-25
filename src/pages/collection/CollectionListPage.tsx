/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Modal,
  notification,
  Space,
  Table,
  Typography,
  Divider,
  Tooltip,
  theme,
  type TableProps,
} from "antd";
import { 
  PlusOutlined, 
  EditOutlined, 
  DeleteOutlined, 
  InfoCircleOutlined,
  FolderOpenOutlined 
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { 
  createCollection, 
  deleteCollectionService, 
  getCollections, 
  updateCollection 
} from "../../services/collection.service.ts";

const { Title, Text, Paragraph } = Typography;

export interface ICollection {
  collection_id: number;
  collection_name: string;
  collection_descriptions: string;
}

const CollectionListPage = () => {
  const { token } = theme.useToken();
  const [collectionForm] = Form.useForm();
  const [collections, setCollections] = useState<ICollection[]>([]);
  const [collectionCount, setCollectionCount] = useState<number>(0);
  const [currentPageNo, setCurrentPageNo] = useState<number>(1);
  const [pageSize] = useState<number>(10);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [collectionId, setCollectionId] = useState<number | null>(null);

  const columns: TableProps<ICollection>["columns"] = [
    {
      title: "Name",
      dataIndex: "collection_name",
      key: "collection_name",
      width: '30%',
      render: (text) => (
        <Space>
          <FolderOpenOutlined style={{ color: token.colorPrimary }} />
          <Text strong style={{ fontSize: '15px' }}>{text}</Text>
        </Space>
      ),
    },
    {
      title: "Description",
      dataIndex: "collection_descriptions",
      key: "collection_descriptions",
      render: (text) => (
        <Text type="secondary">
          {text || <Text italic type="secondary" style={{ opacity: 0.5 }}>No description provided</Text>}
        </Text>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      align: 'end',
      render: (_: any, record) => (
        <Space size="small">
          <Tooltip title="Edit Collection">
            <Button 
              type="text"
              icon={<EditOutlined />} 
              onClick={() => {
                collectionForm.setFieldsValue(record);
                setCollectionId(record?.collection_id);
                setIsEditing(true);
                setIsModalOpen(true);
              }}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Button 
              type="text" 
              danger 
              icon={<DeleteOutlined />} 
              onClick={() => handleDelete(record)}
            />
          </Tooltip>
        </Space>
      ),
    },
  ];

  const handleDelete = (record: ICollection) => {
    Modal.confirm({
      title: "Delete Collection",
      icon: <DeleteOutlined style={{ color: token.colorError }} />,
      content: `Are you sure you want to delete "${record.collection_name}"? This action cannot be undone.`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk: () => {
        const hide = message.loading("Deleting collection...");
        deleteCollectionService(record.collection_id)
          .then(() => {
            message.success("Collection deleted successfully");
            fetchCollections();
          })
          .catch(() => message.error("Something went wrong"))
          .finally(() => hide());
      }
    });
  };

  const onCollectionFormSubmit = (values: any) => {
    const loadingKey = "submit_loading";
    message.loading({ content: isEditing ? "Updating..." : "Creating...", key: loadingKey });

    const action = isEditing 
      ? updateCollection(collectionId as number, values) 
      : createCollection(values);

    action.then(() => {
        notification.success({
          message: isEditing ? "Updated" : "Created",
          description: `Collection "${values.collection_name}" is ready.`,
          placement: "bottomRight"
        });
        fetchCollections();
        setIsModalOpen(false);
      })
      .catch(() => message.error({ content: "Operation failed", key: loadingKey }))
      .finally(() => message.destroy(loadingKey));
  };

  const fetchCollections = async () => {
    try {
      const offset = (pageSize * currentPageNo) - pageSize;
      const response = await getCollections(null, offset, pageSize);
      setCollections(response.data?.collections || []);
      setCollectionCount(response.data?.totalCount || 0);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchCollections();
  }, [currentPageNo]);

  return (
    <div style={{ padding: '24px', background: '#f9f9f9', minHeight: '100vh' }}>
      {/* Header Section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
        <div>
          <Title level={2} style={{ marginBottom: 4 }}>Product Collections</Title>
          <Text type="secondary">Manage groups of products for your storefront.</Text>
        </div>
        <Button 
          type="primary" 
          size="large" 
          icon={<PlusOutlined />}
          onClick={() => {
            setIsEditing(false);
            collectionForm.resetFields();
            setIsModalOpen(true);
          }}
          style={{ boxShadow: '0 4px 10px rgba(22, 119, 255, 0.2)' }}
        >
          Add New Collection
        </Button>
      </div>

      <Card 
        bordered={false} 
        bodyStyle={{ padding: 0 }}
        style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.02), 0 8px 16px rgba(0,0,0,0.04)', borderRadius: 12, overflow: 'hidden' }}
      >
        <Table
          rowKey="collection_id"
          columns={columns}
          dataSource={collections}
          pagination={{
            current: currentPageNo,
            pageSize: pageSize,
            total: collectionCount,
            onChange: setCurrentPageNo,
            position: ['bottomCenter'],
            showSizeChanger: false
          }}
          style={{ background: '#fff' }}
        />
      </Card>

      <Modal
        title={
          <Space>
            {isEditing ? <EditOutlined /> : <PlusOutlined />}
            <span>{isEditing ? "Edit Collection" : "Create Collection"}</span>
          </Space>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
        width={550}
        centered
        destroyOnClose
      >
        <Divider style={{ marginTop: 12 }} />
        <Form
          form={collectionForm}
          layout="vertical"
          onFinish={onCollectionFormSubmit}
          requiredMark="optional"
        >
          <Form.Item
            name="collection_name"
            label={<Text strong>Collection Name</Text>}
            tooltip={{ title: "Give your collection a unique and catchy name.", icon: <InfoCircleOutlined /> }}
            rules={[{ required: true, message: "Please enter collection name" }]}
          >
            <Input placeholder="e.g., Summer Essentials" size="large" />
          </Form.Item>

          <Form.Item
            name="collection_descriptions"
            label={<Text strong>Description</Text>}
          >
            <Input.TextArea 
              rows={4} 
              placeholder="Describe what products belong in this collection..." 
              style={{ borderRadius: 8 }}
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, marginTop: 32 }}>
            <div className="flex justify-end gap-3">
              <Button onClick={() => setIsModalOpen(false)} size="large">Cancel</Button>
              <Button type="primary" htmlType="submit" size="large" style={{ paddingInline: 32 }}>
                {isEditing ? "Update" : "Create"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CollectionListPage;