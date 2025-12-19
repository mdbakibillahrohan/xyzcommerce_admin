import { Row, Col, Button, Typography, Space, Badge } from "antd";
import { PlusOutlined, UploadOutlined, DownloadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";

const { Title } = Typography;

const ProductListHeader = () => {
  const navigate = useNavigate();

  return (
    <Row justify="space-between" align="middle">
      <Col>
        <Space direction="vertical" size={4}>
          <Space>
            <Title level={3} style={{ margin: 0 }}>Products</Title>
            <Badge count={72031} showZero />
          </Space>
          <Space>
            <Button type="link" icon={<DownloadOutlined />}>Export</Button>
            <Button type="link" icon={<UploadOutlined />}>Import</Button>
          </Space>
        </Space>
      </Col>

      <Col>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/products/add")}
        >
          Add product
        </Button>
      </Col>
    </Row>
  );
};

export default ProductListHeader;
