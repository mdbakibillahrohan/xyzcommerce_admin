
import { Row, Col, Button, Typography, Space, Badge, theme } from "antd";
import { 
  PlusOutlined, 
  UploadOutlined, 
  DownloadOutlined,
  ShoppingOutlined,
  ThunderboltFilled
} from "@ant-design/icons";
import { useNavigate } from "react-router";

const { Title, Text } = Typography;

const ProductListHeader = () => {
  const navigate = useNavigate();
  theme.useToken();

  return (
    <div className="cyber-header-wrapper">
      <Row justify="space-between" align="middle" gutter={[0, 24]}>
        <Col xs={24} md={12}>
          <Space align="center" size={20}>
            {/* Animated Icon Container */}
            <div className="header-icon-box">
              <div className="icon-glow" />
              <ShoppingOutlined className="main-icon" />
            </div>

            <div className="header-text-group">
              <Space align="center" size={12}>
                <Title level={1} className="gradient-title">
                  Products
                </Title>
                <div className="cyber-badge-container">
                  <span className="badge-pulse" />
                  <Badge 
                    count="72,031" 
                    className="custom-count-badge"
                  />
                </div>
              </Space>
              <div className="sub-text-flex">
                <ThunderboltFilled className="sub-icon" />
                <Text className="header-description">
                  Global Inventory Control & Product Variants
                </Text>
              </div>
            </div>
          </Space>
        </Col>

        <Col xs={24} md={12} className="actions-col">
          <Space size={16} className="btn-group-cyber">
            <Button 
              className="glass-utility-btn"
              icon={<DownloadOutlined />} 
            >
              Export
            </Button>
            <Button 
              className="glass-utility-btn"
              icon={<UploadOutlined />} 
            >
              Import
            </Button>
            
            <Button
              type="primary"
              className="add-product-btn-neon"
              icon={<PlusOutlined />}
              onClick={() => navigate("/products/add")}
            >
              Add Product
            </Button>
          </Space>
        </Col>
      </Row>

      <style dangerouslySetInnerHTML={{ __html: `
        .cyber-header-wrapper {
          padding: 24px 0 32px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          margin-bottom: 32px;
          position: relative;
        }

        /* Gradient Title */
        .gradient-title {
          margin: 0 !important;
          font-weight: 800 !important;
          letter-spacing: -1px !important;
          background: linear-gradient(to right, #ffffff, #94a3b8);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          font-size: 32px !important;
        }

        /* Icon Animation */
        .header-icon-box {
          width: 54px;
          height: 54px;
          background: rgba(99, 102, 241, 0.1);
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          border: 1px solid rgba(99, 102, 241, 0.2);
          transition: 0.3s;
        }

        .icon-glow {
          position: absolute;
          width: 100%; height: 100%;
          background: #6366f1;
          filter: blur(15px);
          opacity: 0.2;
          animation: glow-pulse 3s infinite;
        }

        .main-icon { color: #6366f1; font-size: 24px; z-index: 1; }

        @keyframes glow-pulse {
          0% { transform: scale(0.8); opacity: 0.1; }
          50% { transform: scale(1.1); opacity: 0.3; }
          100% { transform: scale(0.8); opacity: 0.1; }
        }

        /* Badge Styling */
        .cyber-badge-container { position: relative; }
        .custom-count-badge .ant-scroll-number {
          background: rgba(99, 102, 241, 0.1) !important;
          color: #6366f1 !important;
          border: 1px solid rgba(99, 102, 241, 0.2) !important;
          border-radius: 6px !important;
          font-weight: 700 !important;
          box-shadow: none !important;
        }

        /* Description Styling */
        .sub-text-flex { display: flex; align-items: center; gap: 8px; margin-top: 4px; }
        .sub-icon { color: #f59e0b; font-size: 12px; }
        .header-description { color: #64748b; font-size: 13px; font-weight: 500; }

        /* Buttons: Glassmorphism */
        .glass-utility-btn {
          background: rgba(255, 255, 255, 0.03) !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          color: #94a3b8 !important;
          height: 42px !important;
          border-radius: 12px !important;
          font-weight: 600 !important;
          transition: 0.3s !important;
        }

        .glass-utility-btn:hover {
          background: rgba(255, 255, 255, 0.08) !important;
          color: #fff !important;
          border-color: rgba(255, 255, 255, 0.2) !important;
          transform: translateY(-2px);
        }

        /* Primary Button Neon Glow */
        .add-product-btn-neon {
          height: 42px !important;
          padding: 0 24px !important;
          border-radius: 12px !important;
          background: #6366f1 !important;
          border: none !important;
          font-weight: 700 !important;
          box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3) !important;
          transition: 0.4s !important;
        }

        .add-product-btn-neon:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 12px 28px rgba(99, 102, 241, 0.5) !important;
        }

        .actions-col { display: flex; justify-content: flex-end; }
        @media (max-width: 768px) { .actions-col { justify-content: flex-start; } }
      `}} />
    </div>
  );
};

export default ProductListHeader;