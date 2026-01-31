/* eslint-disable @typescript-eslint/no-unused-vars */
import { theme, Typography, ConfigProvider } from "antd";
import ProductListTabs from "../components/productlist/ProductListTabs";
import ProductListToolbar from "../components/productlist/ProductListToolbar";
import ProductListTable from "../components/productlist/ProductListTable";
import ProductListHeader from "../components/productlist/ProductListHeader";
import { useEffect, useState, useCallback } from "react";
import { getProducts } from "../services/product.service";
import { DatabaseOutlined, RocketFilled } from '@ant-design/icons';

const { Text } = Typography;

const ProductsPage = () => {
  const { token } = theme.useToken();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('all');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
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
    fetchProducts();
  }, [fetchProducts]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: 'rgba(17, 25, 40, 0.75)', // High contrast dark
          colorText: '#e2e8f0', // Clean white-grey text
          colorPrimary: '#6366f1',
        },
        components: {
          Tabs: {
            itemColor: '#94a3b8',
            itemSelectedColor: '#6366f1',
            inkBarColor: '#6366f1',
          }
        }
      }}
    >
      <div className="modern-cyber-page">
        {/* Animated Background Gradients */}
        <div className="bg-glow-top" />
        <div className="bg-glow-bottom" />

        <div className="content-container">
          
          <div className="page-header-section">
            <ProductListHeader />
          </div>

          <div className={`glass-main-card ${loading ? 'is-syncing' : ''}`}>
            
            {/* Top Navigation Bar */}
            <div className="nav-section-blur">
              <ProductListTabs activeTab={activeTab} onChange={(key: string) => setActiveTab(key)} />
            </div>

            {/* Toolbar Area */}
            <div className="toolbar-section-dark">
              <ProductListToolbar />
            </div>

            {/* Optimized Table Area */}
            <div className="table-viewport">
              <ProductListTable dataSource={products} loading={loading} refreshData={fetchProducts} />
            </div>

            {/* Industrial Data Footer */}
            <div className="smart-footer">
              <div className="stat-group">
                <RocketFilled className="footer-icon-glow" />
                <span className="stat-label">TOTAL ASSETS: </span>
                <span className="stat-value">{products.length}</span>
              </div>
              
              <div className="system-health">
                <div className="pulse-container">
                  <div className="pulse-dot" />
                  <div className="pulse-ring" />
                </div>
                <span className="health-text">DATABASE ONLINE</span>
                <DatabaseOutlined className="db-icon" />
              </div>
            </div>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          /* Layout Base */
          .modern-cyber-page {
            padding: 30px 40px;
            background: #0f172a;
            min-height: 100vh;
            position: relative;
            overflow: hidden;
          }

          /* Background Gradients for Depth */
          .bg-glow-top { position: absolute; top: -10%; left: -5%; width: 40%; height: 40%; background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%); pointer-events: none; }
          .bg-glow-bottom { position: absolute; bottom: -10%; right: -5%; width: 40%; height: 40%; background: radial-gradient(circle, rgba(16, 185, 129, 0.08) 0%, transparent 70%); pointer-events: none; }

          .content-container { maxWidth: 1400px; margin: 0 auto; position: relative; z-index: 2; }

          /* Glassmorphism Card */
          .glass-main-card {
            background: rgba(17, 25, 40, 0.6) !important;
            backdrop-filter: blur(16px);
            border: 1px solid rgba(255, 255, 255, 0.08);
            border-radius: 24px;
            overflow: hidden;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
            transition: transform 0.3s ease, border-color 0.3s ease;
          }

          .nav-section-blur { padding: 20px 24px 0; background: rgba(255, 255, 255, 0.02); border-bottom: 1px solid rgba(255, 255, 255, 0.05); }
          .toolbar-section-dark { padding: 12px 24px; background: rgba(0, 0, 0, 0.1); border-bottom: 1px solid rgba(255, 255, 255, 0.03); }

          /* Table Contrast Fix */
          .table-viewport .ant-table { background: transparent !important; }
          .table-viewport .ant-table-thead > tr > th {
            background: rgba(255, 255, 255, 0.03) !important;
            color: #64748b !important;
            font-size: 11px;
            font-weight: 700;
            text-transform: uppercase;
            border-bottom: 1px solid rgba(255, 255, 255, 0.08) !important;
          }

          /* Hover Interactions */
          .table-viewport .ant-table-tbody > tr:hover > td {
            background: rgba(99, 102, 241, 0.05) !important;
            cursor: pointer;
          }

          /* Footer Styling */
          .smart-footer {
            padding: 16px 30px;
            background: rgba(0, 0, 0, 0.2);
            display: flex;
            justify-content: space-between;
            align-items: center;
            border-top: 1px solid rgba(255, 255, 255, 0.05);
          }

          .stat-group { display: flex; align-items: center; gap: 8px; }
          .footer-icon-glow { color: #6366f1; filter: drop-shadow(0 0 5px #6366f1); }
          .stat-label { color: #475569; font-size: 10px; font-weight: 800; letter-spacing: 1px; }
          .stat-value { color: #fff; font-family: 'JetBrains Mono', monospace; font-weight: 700; }

          /* Pulse Animation */
          .pulse-container { position: relative; width: 10px; height: 10px; }
          .pulse-dot { width: 8px; height: 8px; background: #10b981; border-radius: 50%; }
          .pulse-ring {
            position: absolute; width: 8px; height: 8px; background: #10b981; border-radius: 50%;
            animation: ring-ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
          }
          @keyframes ring-ping { 75%, 100% { transform: scale(3); opacity: 0; } }

          .system-health { display: flex; align-items: center; gap: 10px; }
          .health-text { color: #10b981; font-size: 10px; font-weight: 800; }
          .db-icon { color: #475569; font-size: 14px; }

          /* Sync Animation */
          .is-syncing { border-color: rgba(99, 102, 241, 0.5); }
        `}} />
      </div>
    </ConfigProvider>
  );
};

export default ProductsPage;