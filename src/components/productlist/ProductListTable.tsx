/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Switch, Button, Space, Avatar } from "antd";
import { EditOutlined, DownOutlined } from "@ant-design/icons";

const columns = [
  {
    title: "PRODUCT",
    dataIndex: "product_name", // ডাটাবেজে আপনি 'product_name' হিসেবে সেভ করছেন
    key: "product_name",
    render: (_: any, record: any) => {
      // ইমেজের পূর্ণাঙ্গ ইউআরএল তৈরি করা
      const imageUrl = record.image_path 
        ? `http://localhost:3005/${record.image_path}` // আপনার ব্যাকএন্ড পোর্ট ও পাথ
        : "https://via.placeholder.com/48"; // ইমেজ না থাকলে ডিফল্ট

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
    title: "SKU",
    dataIndex: "sku",
    key: "sku",
  },
  {
    title: "STOCKS",
    dataIndex: "stock",
    key: "stock",
    render: (value: any) => <Switch checked={!!value} size="small" />,
  },
  {
    title: "PRICE",
    dataIndex: "price",
    key: "price",
    render: (value: any) => `৳${value}`, // কারেন্সি ফরম্যাট
  },
  {
    title: "ACTIONS",
    key: "actions",
    render: () => (
      <Button size="small">
        <EditOutlined /> Edit <DownOutlined />
      </Button>
    ),
  },
];

const ProductListTable = ({ dataSource, loading }: any) => (
  <Table
    columns={columns}
    dataSource={dataSource} // ProductsPage থেকে আসা ডাটা
    loading={loading}
    pagination={{ pageSize: 10 }} // pagination={false} এর বদলে এটি ব্যবহার করা ভালো
    rowKey="id" // ডাটাবেজের প্রাইমারি কি (ID)
  />
);

export default ProductListTable;