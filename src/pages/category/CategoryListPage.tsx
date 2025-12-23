/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Card,
  Form,
  Input,
  Modal,
  notification,
  Space,
  Table,
  type TableProps,
} from "antd";
import { useEffect, useState } from "react";
import { createCategory, getCategories } from "../../services/category.service";

export interface ICategory {
  category_id: number;
  category_name: string;
  category_descriptions: string;
}

const CategoryListPage = () => {
  const columns: TableProps<ICategory>["columns"] = [
    {
      title: "Name",
      dataIndex: "category_name",
      key: "category_name",
      render: (text) => <a>{text}</a>,
    },
    {
      title: "Description",
      dataIndex: "category_descriptions",
      key: "category_descriptions",
    },

    {
      title: "Action",
      key: "action",
      render: () => (
        <Space size="middle">
          <Button type="link">Edit</Button>
          <Button type="link" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  const [categoryForm] = Form.useForm();
  const [data, setData] = useState<ICategory[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  //category form handlers
  const onCategoryFormSubmit = (values: any) => {
    createCategory(values)
      .then((response) => {
        console.log(response);
        notification.success({
          message: "Success",
          description: "Category created successfully",
        });
        categoryForm.resetFields();
        fetchCategories();
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Error creating category:", error);
      });
  }

  //Modal Handlers
  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setData(response.data?.categories || []);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <div>
      <Card
        title="Categories"
        className="mb-4"
        extra={
          <Button onClick={() => setIsModalOpen(true)}>Add Category</Button>
        }
      >
        <Table rowKey="category_id" columns={columns} dataSource={data} />
      </Card>

      {/* Add and edit category modal */}
      <Modal
        title="Add Category"
        closable={{ "aria-label": "Custom Close Button" }}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        width={700}
        footer={null}
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          form={categoryForm}
          name="control-hooks"
          onFinish={onCategoryFormSubmit}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            name="category_name"
            label="Category Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="category_descriptions"
            label="Category Description"
            rules={[{ required: false }]}
          >
            <Input.TextArea />
          </Form.Item>
          <div className="flex justify-end items-center gap-3">
            <Button type="primary" htmlType="submit">
              Save
            </Button>
            <Button onClick={()=>{categoryForm.resetFields()}} htmlType="button">Reset</Button>
          </div>
        </Form>
      </Modal>
    </div>
  );
};

export default CategoryListPage;
