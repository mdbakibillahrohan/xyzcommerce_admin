
import { Card, Space, message } from "antd";
import ProductListTabs from "../components/productlist/ProductListTabs";
import ProductListToolbar from "../components/productlist/ProductListToolbar";
import ProductListTable from "../components/productlist/ProductListTable";
import ProductListHeader from "../components/productlist/ProductListHeader";
import { useEffect, useState } from "react";
import { getProducts } from "../services/product.service";

const ProductsPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await getProducts();
        
        
        const productData = response.data?.products || response.data?.data || response.data || [];
        
        console.log("Fetched Products:", productData); 
        setProducts(productData);
      } catch (error) {
        console.error("Error loading products:", error);
        message.error("Failed to load products");
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  return (
    <Space direction="vertical" size="large" style={{ width: "100%" }}>
      <ProductListHeader />
      <ProductListTabs />

      <Card>
        <Space direction="vertical" size="middle" style={{ width: "100%" }}>
          <ProductListToolbar />
         
          <ProductListTable dataSource={products} loading={loading} />
        </Space>
      </Card>
    </Space>
  );
};

export default ProductsPage;