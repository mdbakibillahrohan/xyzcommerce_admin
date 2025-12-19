import { Card, Space } from "antd";
import ProductListHeader from "../components/productlist/productListHeader";
import ProductListTabs from "../components/productlist/ProductListTabs";
import ProductListToolbar from "../components/productlist/ProductListToolbar";
import ProductListTable from "../components/productlist/ProductListTable";


// import ProductToolbar from "./ProductToolbar";
// import ProductsTable from "./ProductsTable";

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
