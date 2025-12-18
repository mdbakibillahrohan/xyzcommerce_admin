import {Card,Form,Input, Select} from "antd"
const { Option } = Select;
const OrganizationComponent = () => {
  return (
    <div>
      <Card>
         <h3 style={{ marginBottom: '24px', marginTop: 0, fontWeight: 600 }}>Organization</h3>
        <Form layout="vertical">
           <Form.Item label="Vendor">
          <Input placeholder="eg. Nike" />
        </Form.Item>
         <Form.Item label="Category">
          <Select placeholder="Select category">
            <Option value="clothing">Clothing</Option>
            <Option value="shoes">Shoes</Option>
            <Option value="electronics">Electronics</Option>
            <Option value="others">Others</Option>
          </Select>
        </Form.Item>
        <Form.Item label="Collections">
          <Select placeholder="Select category">
            <Option value="clothing">Winter</Option>
            <Option value="shoes">Spring</Option>
            <Option value="electronics">Summer</Option>
            <Option value="others">Autumn</Option>
          </Select>
        </Form.Item>
         <Form.Item label="Tags">
          <Input placeholder="Enter tags here" />
        </Form.Item>

        </Form>
      </Card>
    </div>
  )
}

export default OrganizationComponent
