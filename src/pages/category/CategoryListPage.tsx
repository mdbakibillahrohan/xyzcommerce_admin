 
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
  type TableProps,
} from "antd";
import { useEffect, useState } from "react";
import { createCategory, deleteCategoryService, getCategories, updateCategory } from "../../services/category.service";

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
      render: (_:any, record) => (
        <Space size="middle">
          <Button onClick={()=>{
            categoryForm.setFieldsValue(record)
            setCategoryId(record?.category_id)
            setIsEditing(true);
            setIsModalOpen(true);
          }} type="link">Edit</Button>
          <Button onClick={()=>{
            Modal.confirm({
              title: "Are you sure you want to delete?",
              okText: "Yes",
              onOk: ()=>{
                const showDeletingStatus = message.loading("Deleting....");
                deleteCategoryService(record.category_id).then(()=>{
                  fetchCategories();
                }).catch(()=>{
                  message.error("Something went wrong");
                }).finally(()=>{
                  showDeletingStatus();
                })
              }
            })
          }} type="link" danger>
            Delete
          </Button>
        </Space>
      ),
    },
  ];
  const [categoryForm] = Form.useForm();
  const [data, setData] = useState<ICategory[]>([]);
  const [categoryCount, setCategoryCount] = useState<number>(0);
  const [currentPageNo, setCurrentPageNo] = useState<number>(1);
  const [pageSize, setCurrentPageSize] = useState<number>(10);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [categoryId, setCategoryId] = useState<number|null>(null);

  //category form handlers
  const onCategoryFormSubmit = (values: any) => {

    const showMessageCreateOrUpdate = message.loading(isEditing?"Updating....":"Creating.....");

    if(isEditing){
      updateCategory(categoryId, values).then((response)=>{
        console.log(response);
        notification.success({
          message: "Successfully update the category"
        })
        fetchCategories();
        setIsModalOpen(false);
      }).catch((err:any)=>{
        console.log(err);
        message.error("Something went wrong");
      }).finally(()=>{
        showMessageCreateOrUpdate();
      })

      return;
    }

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
      }).finally(()=>{
        showMessageCreateOrUpdate();
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
  }, [currentPageNo]);

  return (
    <div>
      <Card
        title="Categories"
        className="mb-4"
        extra={
          <Button onClick={() => setIsModalOpen(true)}>Add Category</Button>
        }
      >
        <Table 
        rowKey="category_id" 
        columns={columns} 
        dataSource={data} 
        pagination={{
          pageSize: pageSize,
          total: categoryCount,
          onChange: (pageNo)=>{
            setCurrentPageNo(pageNo)
          },
          onShowSizeChange: (pageSizeFromParam)=>{
            setCurrentPageSize(pageSizeFromParam)
          }
        }}
         />
        
      </Card>

      {/* Add and edit category modal */}
      <Modal
        title={isEditing?"Edit Category":"Add Category"}
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
