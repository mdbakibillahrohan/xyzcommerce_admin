import { Row, Col, Button, Typography, Space, Badge, theme } from "antd";
import { 
  PlusOutlined, 
  UploadOutlined, 
  DownloadOutlined,
  ShoppingOutlined 
} from "@ant-design/icons";
import { useNavigate } from "react-router";

const { Title, Text } = Typography;

const ProductListHeader = () => {
  const navigate = useNavigate();
  const { token } = theme.useToken();

  return (
    <div style={{ 
      paddingBottom: 24, 
      borderBottom: `1px solid ${token.colorBorderSecondary}`,
      marginBottom: 32 
    }}>
      <Row justify="space-between" align="bottom">
        <Col>
          <Space align="center" size={12} style={{ marginBottom: 8 }}>
            <div style={{
              width: 40,
              height: 40,
              backgroundColor: token.colorPrimaryBg,
              borderRadius: 8,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <ShoppingOutlined style={{ fontSize: 20, color: token.colorPrimary }} />
            </div>
            <div>
              <Space align="start">
                <Title level={2} style={{ margin: 0, letterSpacing: '-0.02em' }}>
                  Products
                </Title>
                <Badge 
                  count="72,031" 
                  style={{ 
                    backgroundColor: token.colorFillSecondary, 
                    color: token.colorTextSecondary,
                    boxShadow: 'none',
                    borderRadius: '4px',
                    fontWeight: 600
                  }} 
                />
              </Space>
              <Text type="secondary" style={{ fontSize: 13 }}>
                Manage your global inventory and product variants
              </Text>
            </div>
          </Space>
        </Col>

        <Col>
          <Space size={12}>
            {/* Utility Actions with Industrial Style */}
            <Button 
              icon={<DownloadOutlined />} 
              style={{ borderRadius: 6, fontWeight: 500 }}
            >
              Export
            </Button>
            <Button 
              icon={<UploadOutlined />} 
              style={{ borderRadius: 6, fontWeight: 500 }}
            >
              Import
            </Button>
            
            {/* Primary Action */}
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={() => navigate("/products/add")}
              style={{ 
                borderRadius: 6, 
                fontWeight: 600,
                boxShadow: `0 4px 12px ${token.colorPrimary}40` // Subtle glow
              }}
            >
              Add product
            </Button>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default ProductListHeader;