/* eslint-disable react-hooks/exhaustive-deps */
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
  type TableProps,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { createCategory, deleteCategoryService, getCategories, updateCategory } from "../../services/category.service";

const { Title, Text } = Typography;

export interface ICategory {
  category_id: number;
  category_name: string;
  category_descriptions: string;
}

const CategoryListPage = () => {
  const [categoryForm] = Form.useForm();
  const [data, setData] = useState<ICategory[]>([]);
  const [categoryCount, setCategoryCount] = useState<number>(0);
  const [currentPageNo, setCurrentPageNo] = useState<number>(1);
  const [pageSize, setCurrentPageSize] = useState<number>(10);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<number | null>(null);

  const columns: TableProps<ICategory>["columns"] = [
    {
      title: "Category Name",
      dataIndex: "category_name",
      key: "category_name",
      render: (text) => <Text strong style={{ color: '#1890ff' }}>{text}</Text>,
    },
    {
      title: "Description",
      dataIndex: "category_descriptions",
      key: "category_descriptions",
      render: (text) => <Text type="secondary">{text || "No description provided"}</Text>,
    },
    {
      title: "Action",
      key: "action",
      align: "right", // Aligning actions to the right is standard in modern dashboards
      width: 150,
      render: (_: any, record) => (
        <Space size="small">
          <Button 
            type="text" 
            icon={<EditOutlined />} 
            onClick={() => {
              categoryForm.setFieldsValue(record);
              setCategoryId(record?.category_id);
              setIsEditing(true);
              setIsModalOpen(true);
            }}
          >
            Edit
          </Button>
          <Button 
            type="text" 
            danger 
            icon={<DeleteOutlined />}
            onClick={() => {
              Modal.confirm({
                title: "Delete Category",
                content: `Are you sure you want to delete "${record.category_name}"? This action cannot be undone.`,
                okText: "Delete",
                okType: "danger",
                cancelText: "Cancel",
                onOk: () => {
                  const showDeletingStatus = message.loading("Deleting....");
                  deleteCategoryService(record.category_id).then(() => {
                    fetchCategories();
                  }).catch(() => {
                    message.error("Something went wrong");
                  }).finally(() => {
                    showDeletingStatus();
                  });
                }
              });
            }}
          >
            Delete
          </Button>
        </Space>
      ),
    },
  ];

  const onCategoryFormSubmit = (values: any) => {
    const showMessageCreateOrUpdate = message.loading(isEditing ? "Updating...." : "Creating.....");

    if (isEditing) {
      updateCategory(categoryId, values).then((_response) => {
        notification.success({ message: "Category updated successfully" });
        fetchCategories();
        closeModal();
      }).catch((_err: any) => {
        message.error("Something went wrong");
      }).finally(() => {
        showMessageCreateOrUpdate();
      });
      return;
    }

    createCategory(values)
      .then((_response) => {
        notification.success({
          message: "Success",
          description: "Category created successfully",
        });
        fetchCategories();
        closeModal();
      })
      .catch((error) => {
        console.error("Error creating category:", error);
      }).finally(() => {
        showMessageCreateOrUpdate();
      });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsEditing(false);
    setCategoryId(null);
    categoryForm.resetFields();
  };

  const fetchCategories = async () => {
    try {
      const offset = (pageSize * currentPageNo) - pageSize;
      const response = await getCategories(null, offset, pageSize);
      setData(response.data?.categories || []);
      setCategoryCount(response.data?.count || 0);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, [currentPageNo, pageSize]);

  return (
    <div style={{ padding: '24px', background: '#f5f5f5', minHeight: '100vh' }}>
      <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Title level={2} style={{ marginBottom: 0 }}>Product Categories</Title>
          <Text type="secondary">Manage your product hierarchy and classifications</Text>
        </div>
        <Button 
          type="primary" 
          icon={<PlusOutlined />} 
          size="large"
          onClick={() => {
            setIsEditing(false);
            setIsModalOpen(true);
          }}
        >
          Add Category
        </Button>
      </div>

      <Card bordered={false} style={{ boxShadow: '0 1px 2px 0 rgba(0, 0, 0, 0.03), 0 1px 6px -1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.02)' }}>
        <Table 
          rowKey="category_id" 
          columns={columns} 
          dataSource={data} 
          pagination={{
            current: currentPageNo,
            pageSize: pageSize,
            total: categoryCount,
            showSizeChanger: true,
            onChange: (page, size) => {
              setCurrentPageNo(page);
              setCurrentPageSize(size);
            },
          }}
        />
      </Card>

      <Modal
        title={isEditing ? "Update Category" : "Create New Category"}
        open={isModalOpen}
        onCancel={closeModal}
        destroyOnClose
        footer={null}
        width={500}
      >
        <Divider style={{ marginTop: 10 }} />
        <Form
          layout="vertical" // Professional dashboards usually use vertical labels
          form={categoryForm}
          onFinish={onCategoryFormSubmit}
          requiredMark="optional"
        >
          <Form.Item
            name="category_name"
            label={<Text strong>Category Name</Text>}
            rules={[{ required: true, message: 'Please enter category name' }]}
          >
            <Input placeholder="e.g. Electronics" size="large" />
          </Form.Item>

          <Form.Item
            name="category_descriptions"
            label={<Text strong>Description</Text>}
          >
            <Input.TextArea 
              rows={4} 
              placeholder="Enter a brief description of this category..." 
            />
          </Form.Item>

          <Form.Item style={{ marginBottom: 0, marginTop: 24 }}>
            <div style={{ display: 'flex', justifyContent: 'end', gap: '8px' }}>
              <Button onClick={closeModal}>
                Cancel
              </Button>
              <Button type="primary" htmlType="submit" size="large">
                {isEditing ? "Update Category" : "Create Category"}
              </Button>
            </div>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryListPage;