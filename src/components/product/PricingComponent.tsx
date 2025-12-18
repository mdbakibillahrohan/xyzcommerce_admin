import {Card,Form,InputNumber,Select,Typography,Switch,Row,Col,Space,} from "antd"
import {  QuestionCircleOutlined,StarFilled } from '@ant-design/icons';
const { Text } = Typography;
const onChange = (checked: boolean) => {
  console.log(`switch to ${checked}`);
};

const PricingComponent = () => {
    const currencySelector = (
    <Select defaultValue="USD" style={{ width: 90 }} variant="borderless">
      <Select.Option value="USD">USD</Select.Option>
      <Select.Option value="AED">AED</Select.Option>
      <Select.Option value="AFN">AFN</Select.Option>
      <Select.Option value="ALL">ALL</Select.Option>
      <Select.Option value="AMD">AMD</Select.Option>
    </Select>
  );
  return (
    <div style={{ maxWidth: '450px' }}>
      <Card >
   
        <h3 style={{ marginBottom: '24px', marginTop: 0, fontWeight: 600 }}>Pricing</h3>
        <Form layout="vertical">
            <Form.Item label={<strong>Price</strong>} name="price"style={{ marginBottom: '16px' }}>
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                placeholder="0.00"
                size="large"
                addonAfter={
                  currencySelector
                }
              />
            </Form.Item>
            {/* Links with Star Icons */}
          <Space direction="vertical" style={{ width: '100%', marginBottom: '25px' }}>
            <Space style={{ cursor: 'pointer' }}>
              <StarFilled style={{ color: '#ffbb96' }} />
             <Typography.Link>Set "Compare to" price</Typography.Link>
            </Space>
            <Space style={{ cursor: 'pointer' }}>
              <StarFilled style={{ color: '#ffbb96' }} />
             <Typography.Link>Bulk discount pricing</Typography.Link>
            </Space>
          </Space>
            {/* Availability Section */}
          <div style={{ marginTop: '30px', borderTop: '1px solid #f0f0f0', paddingTop: '20px' }}>
            <Row justify="space-between" align="middle">
                <Col>
                <Text>
              Availability <QuestionCircleOutlined style={{ color: '#bfbfbf' }} />
            </Text>
                </Col>
                <Col>
                <Switch defaultChecked onChange={onChange} />
                </Col>
            </Row>
            
          </div>

        </Form>
      </Card>
    </div>
  )
}

export default PricingComponent
