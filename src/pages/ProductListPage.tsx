/* eslint-disable @typescript-eslint/no-unused-vars */
import { Card, theme, Typography, ConfigProvider } from "antd";
import ProductListTabs from "../components/productlist/ProductListTabs";
import ProductListToolbar from "../components/productlist/ProductListToolbar";
import ProductListTable from "../components/productlist/ProductListTable";
import ProductListHeader from "../components/productlist/ProductListHeader";
import { useEffect, useState, useCallback } from "react";
import { getProducts } from "../services/product.service";

const { Text } = Typography;

const ProductsPage = () => {
  const { token } = theme.useToken();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const fetchProducts = useCallback(async (status?: string) => {
    setLoading(true);
    try {
      const statusParam = activeTab === 'all' ? undefined : activeTab;
      const response = await getProducts(activeTab === 'all' ? undefined : activeTab);
      const productData = response.data?.products || response.data?.data || response.data || [];
      setProducts(productData);
    } catch (error) {
      console.error("Error loading products:", error);
    } finally {
      setLoading(false);
    }
  }, [activeTab]);

  useEffect(() => {
    // const fetchProducts = async () => {
    //   setLoading(true);
    //   try {
    //     const response = await getProducts();
    //     const productData = response.data?.products || response.data?.data || response.data || [];
    //     setProducts(productData);
    //   } catch (error) {
    //     console.error("Error loading products:", error);
    //   } finally {
    //     setLoading(false);
    //   }
    // };
    fetchProducts();
  }, [fetchProducts]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Card: {
            paddingLG: 0, 
          },
        },
      }}
    >
      <div style={{ 
        padding: '24px 40px', 
        background: '#f8f9fa', 
        minHeight: '100vh' 
      }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          
          
          <div style={{ marginBottom: 16 }}>
            <ProductListHeader />
          </div>

          
          <div style={{ 
            background: token.colorBgContainer,
            borderRadius: '12px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
            border: `1px solid ${token.colorBorderSecondary}`,
            overflow: 'hidden'
          }}>
            
           
            <div style={{ 
              padding: '16px 20px 0px 20px', 
              borderBottom: `1px solid ${token.colorBorderSecondary}`,
              background: '#ffffff'
            }}>
              <ProductListTabs activeTab={activeTab} onChange={(key: string) => setActiveTab(key)} />
            </div>

           
            <div style={{ 
              background: '#ffffff',
              padding: '4px 0' 
            }}>
              <ProductListToolbar />
            </div>

            
            <div className="product-table-wrapper">
              <ProductListTable dataSource={products} loading={loading} refreshData={fetchProducts} />
            </div>

            
            <div style={{ 
              padding: '10px 24px', 
              background: token.colorFillAlter,
              borderTop: `1px solid ${token.colorBorderSecondary}`,
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <Text type="secondary" style={{ fontSize: '12px', fontWeight: 500 }}>
                Total Items: {products.length}
              </Text>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: token.colorSuccess }} />
                <Text type="secondary" style={{ fontSize: '12px' }}>System Operational</Text>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        
        .product-table-wrapper .ant-table-wrapper .ant-table {
          border-radius: 0 !important;
        }
        .product-table-wrapper .ant-table-container {
          border-radius: 0 !important;
        }
        .ant-tabs-nav {
          margin-bottom: 0 !important;
        }
      `}} />
    </ConfigProvider>
  );
};

export default ProductsPage;