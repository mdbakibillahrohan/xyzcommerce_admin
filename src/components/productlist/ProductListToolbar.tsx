import { Input, Button, Space } from "antd";
import { FilterOutlined, TableOutlined } from "@ant-design/icons";

const ProductListToolbar = () => (
  <Space style={{ width: "100%", justifyContent: "space-between" }}>
    <Input.Search
      placeholder="Search users"
      style={{ maxWidth: 300 }}
    />

    <Space>
      <Button icon={<FilterOutlined />}>Filters</Button>
      <Button icon={<TableOutlined />}>Columns</Button>
    </Space>
  </Space>
);

export default ProductListToolbar;
