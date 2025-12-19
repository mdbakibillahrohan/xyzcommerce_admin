/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Switch, Button, Space, Avatar } from "antd";
import { EditOutlined, DownOutlined } from "@ant-design/icons";
import type { ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

const columns = [
  {
    title: "PRODUCT",
    dataIndex: "product",
    render: (_: any, record: { image: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; product: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; }) => (
        <Space>
            <Avatar shape="square" size={48} src={record.image} />
            <strong>{record.product}</strong>
        </Space>
    ),
  },
  {
    title: "TYPE",
    dataIndex: "type",
  },
  {
    title: "STOCKS",
    dataIndex: "stock",
    render: (value: boolean | undefined) => <Switch defaultChecked={value} />,
  },
  {
    title: "SKU",
    dataIndex: "sku",
  },
  {
    title: "PRICE",
    dataIndex: "price",
  },
  {
    title: "VARIANTS",
    dataIndex: "variants",
  },
  {
    title: "ACTIONS",
    render: () => (
      <Button>
        <EditOutlined /> Edit <DownOutlined />
      </Button>
    ),
  },
];

const data = [
  {
    key: 1,
    product: "Photive wireless speakers",
    type: "Electronics",
    stock: true,
    sku: "2384741241",
    price: "$65",
    variants: 2,
    image: "https://via.placeholder.com/48",
  },
  {
    key: 2,
    product: "Topman shoe",
    type: "Shoes",
    stock: true,
    sku: "4124123847",
    price: "$21",
    variants: 4,
    image: "https://via.placeholder.com/48",
  },
];

const ProductListTable = () => (
  <Table
    columns={columns}
    dataSource={data}
    pagination={false}
  />
);

export default ProductListTable;
