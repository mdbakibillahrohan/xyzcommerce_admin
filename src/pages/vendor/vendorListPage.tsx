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
  Tag,
  Tooltip,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  PlusOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import {
  createVendor,
  deleteVendorService,
  getVendors,
  updateVendor,
} from "../../services/vendor.service";
import Avatar from "antd/es/avatar/Avatar";

const { Title, Text } = Typography;

const VendorListPage = () => {
  const [vendorForm] = Form.useForm();
  const [vendors, setVendors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [currentVendorId, setCurrentVendorId] = useState<number | null>(null);

  
  const fetchVendors = async () => {
    setLoading(true);
    try {
      const response = await getVendors(null, 0, 100);
      setVendors(response.data?.vendors || []);
    } catch (error) {
      notification.error({ message: "Failed to load vendors" });
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
      notification.error({ message: "Delete failed" });
    }
  };

 
 const handleEdit = (record: any) => {
    setIsEditing(true);
    setCurrentVendorId(record.vendor_id);
    //
   vendorForm.setFieldsValue({
      vendor_name: record.vendor_name,
      vendor_address: record.vendor_address, 
      description: record.description || record.description, 
    });
    setIsModalOpen(true);
  };

  //  (Create/Update)
  const onFinish = async (values: any) => {
    try {
      
     const payload = {
        vendor_name: values.vendor_name,
        vendor_address: values.vendor_address || "",
        description: values.description || "", 
      };

      if (isEditing && currentVendorId) {
        await updateVendor(currentVendorId, payload);
        notification.success({ message: "Vendor updated successfully" });
      } else {
        await createVendor(payload);
        notification.success({ message: "Vendor created successfully" });
      }
      setIsModalOpen(false);
      vendorForm.resetFields();
      fetchVendors();
    } catch (error: any) {
    
      notification.error({
        message: "Operation Failed",
        description: error.response?.data?.message || "Validation Error", 
      });
    }
  };

  const columns = [
    {
      title: "Vendor Details",
      key: "vendor_name",

      render: (record: any) => (
        <Space>
          <Avatar icon={<ShopOutlined />} style={{ backgroundColor: "#1677ff" }} />
          <Space direction="vertical" size={0}>
            <Text strong>{record.vendor_name}</Text>
            <Tag color="blue">ID: {record.vendor_id}</Tag>
          </Space>
        </Space>
      ),
    },
    {
      title: "Address",
      dataIndex: "vendor_address", 
      key: "vendor_address",
      render: (text: string) => text || "N/A",
    },
    {
      title: "Description",
      dataIndex: "description", 
      key: "description",
      ellipsis: true,
    },
    {
      title: "Action",
      key: "action",
      width: 150,
      align: "center" as const,
      render: (record: any) => (
        <Space>
          <Tooltip title="Edit">
            <Button
              type="primary"
              ghost
              icon={<EditOutlined />}
              onClick={() => handleEdit(record)}
            />
          </Tooltip>
          <Popconfirm
            title="Are you sure?"
            onConfirm={() => handleDelete(record.vendor_id)}
            okText="Yes"
            cancelText="No"
            okButtonProps={{ danger: true }}
          >
            <Tooltip title="Delete">
              <Button danger icon={<DeleteOutlined />} />
            </Tooltip>
          </Popconfirm>
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
          bordered
        />
      </Card>

     <Modal
        title={isEditing ? "Edit Vendor" : "Create Vendor"}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={() => vendorForm.submit()}
        destroyOnClose
      >
        <Form form={vendorForm} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Vendor Name"
            name="vendor_name"
            rules={[{ required: true, message: "Required" }]}
          >
            <Input placeholder="Enter vendor name" />
          </Form.Item>

        
          <Form.Item label="Address" name="vendor_address">
            <Input placeholder="Enter address" />
          </Form.Item>

        
          <Form.Item label="Description" name="description">
            <Input.TextArea rows={4} placeholder="Enter description" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default VendorListPage;