import { Tabs } from "antd";

const ProductListTabs = () => (
  <Tabs
    defaultActiveKey="1"
    items={[
      { key: "1", label: "All products" },
      { key: "2", label: "Archived" },
      { key: "3", label: "Publish" },
      { key: "4", label: "Unpublish" },
    ]}
  />
);

export default ProductListTabs;
