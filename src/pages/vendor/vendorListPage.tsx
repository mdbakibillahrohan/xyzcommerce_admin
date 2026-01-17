/* eslint-disable @typescript-eslint/no-unused-vars */
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
  Typography,
  Popconfirm,
  Tooltip,
  type TableProps,
} from "antd";
import { EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  createVendor,
  deleteVendorService,
  getVendors,
  updateVendor,
} from "../../services/vendor.service";

const { Title } = Typography;

export interface IVendor {
  vendor_id: number;
  vendor_name: string;
  vendor_description: string;
}

const VendorListPage = () => {
  const [vendorForm] = Form.useForm();
  const [vendors, setVendors] = useState<IVendor[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitLoading, setSubmitLoading] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [vendorId, setVendorId] = useState<number | null>(null);


  const fetchVendors = async () => {
    setLoading(true);
    try {
      const response = await getVendors(null, 0, 100);
      setVendors(response.data?.vendors || []);
    } catch (error) {
      notification.error({ message: "Failed to fetch vendors" });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteVendorService(id);
      notification.success({ message: "Vendor deleted successfully" });
      fetchVendors();
    } catch (error) {
      notification.error({ message: "Failed to delete vendor" });
    }
  };


  const handleEdit = (record: IVendor) => {
    setIsEditing(true);
    setVendorId(record.vendor_id);
    vendorForm.setFieldsValue(record);
    setIsModalOpen(true);
  };

  const onFinish = async (values: any) => {
    setSubmitLoading(true);
    try {
      if (isEditing && vendorId) {
        await updateVendor(vendorId, values);
        notification.success({ message: "Vendor updated successfully" });
      } else {
        await createVendor(values);
        notification.success({ message: "Vendor created successfully" });
      }
      setIsModalOpen(false);
      vendorForm.resetFields();
      fetchVendors();
    } catch (error) {
      notification.error({ message: "Operation failed" });
    } finally {
      setSubmitLoading(false);
    }
  };

  const columns: TableProps<IVendor>["columns"] = [
    {
      title: "Vendor Name",
      dataIndex: "vendor_name",
      key: "vendor_name",
      render: (text) => <Typography.Text strong color="blue">{text}</Typography.Text>,
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "vendor_description",
      ellipsis: true, 
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      align: 'center',
      render: (_, record) => (
        <Space size="middle">
          <Tooltip title="Edit">
            <Button
              type="link"
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Tooltip title="Delete">
            <Popconfirm
              title="Are you sure to delete this vendor?"
              onConfirm={() => handleDelete(record.vendor_id)}
              okText="Yes"
              cancelText="No"
              okButtonProps={{ danger: true }}
            >
              <Button type="link" danger icon={<DeleteOutlined />} />
            </Popconfirm>
          </Tooltip>
        </Space>
      ),
    },
  ];

  return (
    <div style={{ padding: "24px" }}>
      <Card
        title={<Title level={3}>Vendor Management</Title>}
        extra={
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={() => {
              setIsEditing(false);
              setVendorId(null);
              vendorForm.resetFields();
              setIsModalOpen(true);
            }}
          >
            Add Vendor
          </Button>
        }
      >
        <Table
          columns={columns}
          dataSource={vendors}
          rowKey="vendor_id"
          loading={loading}
          pagination={{ pageSize: 10 }}
          bordered
        />
      </Card>

      <Modal
        title={isEditing ? "Edit Vendor Details" : "Create New Vendor"}
        open={isModalOpen} 
        onCancel={() => setIsModalOpen(false)}
        onOk={() => vendorForm.submit()}
        confirmLoading={submitLoading}
        okText={isEditing ? "Update" : "Save"}
        destroyOnClose
      >
        <Form
          form={vendorForm}
          layout="vertical"
          onFinish={onFinish}
          style={{ marginTop: 16 }}
        >
          <Form.Item
            label="Vendor Name"
            name="vendor_name"
            rules={[{ required: true, message: "Please enter vendor name" }]}
          >
            <Input placeholder="Enter vendor name" />
          </Form.Item>

          <Form.Item
            label="Vendor Description"
            name="vendor_description"
          >
            <Input.TextArea rows={4} placeholder="Enter description (optional)" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default VendorListPage;