import { Card, Space } from "antd";

import ProductListTabs from "../components/productlist/ProductListTabs";
import ProductListToolbar from "../components/productlist/ProductListToolbar";
import ProductListTable from "../components/productlist/ProductListTable";
import ProductListHeader from "../components/productlist/ProductListHeader";


const ProductsPage = () => {
  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <ProductListHeader/>
      <ProductListTabs />
      

      <Card>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <ProductListToolbar />
         <ProductListTable/>
        </Space>
      </Card>
    </Space>
  );
};

export default ProductsPage;
