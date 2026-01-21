/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Switch, Button, Space, Avatar, Tag, message } from "antd";
import { EditOutlined, DownOutlined, DeleteOutlined } from "@ant-design/icons";
import axios from "axios";

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
    render: (value: any) => <Switch checked={value > 0} size="small" />,
  },
  {
    title: "PRICE",
    dataIndex: "price",
    key: "price",
    render: (value: any) => `৳${value}`, 
  },
  // {
  //   title: "STATUS",
  //   dataIndex: "status",
  //   key: "status",
  //   render: (status: string) => {
      
  //     let color = status === 'published' ? 'green' : 'orange';
  //     if (status === 'archived') color = 'blue';
      
  //     return (
  //       <Tag color={color} style={{ textTransform: 'capitalize' }}>
  //         {status || 'unpublished'}
  //       </Tag>
  //     );
  //   },
  // },
 {
  title: "PUBLISH",
  key: "publish_toggle",
  render: (_: any, record: any) => (
    <Switch 
      checked={record.status === 'published'} 
      size="small"
  //     onChange={async (checked) => {
  //       const newStatus = checked ? 'published' : 'unpublished';
  //       try {
  //         await axios.patch(`http://localhost:3005/api/master/products/status/${record.product_id}`, {
  //           status: newStatus
  //         });
  //         message.success(`Product ${newStatus} successfully`);
  //       } catch (error) {
  //         message.error("Failed to update status");
  //       }
  //     }}
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

const ProductListTable = ({ dataSource, loading }: any) => (
  <Table
    columns={columns}
    dataSource={dataSource} 
    loading={loading}
    pagination={{ pageSize: 10 }}
    rowKey="product_id" 
  />
);

export default ProductListTable;