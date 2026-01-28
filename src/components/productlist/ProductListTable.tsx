/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Switch, Button, Space, Avatar, message } from "antd";
import { EditOutlined, DownOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

interface ProductListTableProps {
  dataSource: any[];
  loading: boolean;
  refreshData: () => void;
}

const ProductListTable = ({ dataSource, loading, refreshData }: ProductListTableProps) => {


  const handleStatusChange = async (checked: boolean, record: any) => {
    const newStatus = checked ? 'published' : 'unpublished';
    try {
      await axios.patch(`http://localhost:3005/api/master/products/status/${record.product_id}`, {
        status: newStatus
      });
      message.success(`Product ${newStatus} successfully`);
      
      
      if (refreshData) {
        refreshData();
      }
    } catch (error) {
      console.error(error);
      message.error("Failed to update status");
    }
  };

  const columns = [
    {
      title: "PRODUCT",
      dataIndex: "product_name",
      key: "product_name",
      render: (_: any, record: any) => {
        const imageUrl = record.image_path
          ? `http://localhost:3005/${record.image_path}`
          : "https://via.placeholder.com/48";

        return (
          <Space>
            <Avatar shape="square" size={48} src={imageUrl} />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <strong style={{ color: '#1677ff' }}>{record.product_name}</strong>
              <small style={{ color: '#8c8c8c' }}>{record.category_name || 'No Category'}</small>
            </div>
          </Space>
        );
      },
    },
    {
      title: "Vendor",
      dataIndex: "vendor_name",
      key: "vendor_name",
      render: (text: string) => text || "N/A",
    },
    {
      title: "Collection",
      dataIndex: "collection_name",
      key: "collection_name",
      render: (text: string) => text || "N/A",
    },
    {
      title: "SKU",
      dataIndex: "sku",
      key: "sku",
    },
    {
      title: "STOCKS",
      dataIndex: "stocks",
      key: "stocks",
      render: (value: any) => <Switch checked={value > 0} size="small" disabled />,
    },
    {
      title: "PRICE",
      dataIndex: "price",
      key: "price",
      render: (value: any) => `৳${value}`,
    },
    {
      title: "PUBLISH",
      key: "publish_toggle",
      render: (_: any, record: any) => (
        <Switch 
          
         checked={String(record.status) === 'published' || String(record.status) === '0'} 
  //        checkedChildren="ON"
  // unCheckedChildren="OFF"
          size="small"
          onChange={(checked) => handleStatusChange(checked, record)}
        />
      ),
    },
    {
      title: "ACTIONS",
      key: "actions",
      render: () => (
        <Space>
          <Button size="small">
            <EditOutlined /> Edit <DownOutlined />
          </Button>
          <Button size="small" danger>
            <DeleteOutlined /> Delete
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      loading={loading}
      pagination={{ pageSize: 10 }}
      rowKey="product_id"
    />
  );
};

export default ProductListTable;