import { Card, Form, Input, Row, Col, Select, Button } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useState } from "react";

const { Option } = Select;

const VariantsComponent = () => {
  const [rows, setRows] = useState([1]); // start with one row

  const addRow = () => {
    setRows([...rows, rows.length + 1]);
  };

  return (
    <Card>
      <h3 style={{ marginBottom: 24, fontWeight: 600 }}>
        Variants
      </h3>

      <Form layout="vertical">
        {rows.map((_, index) => (
          <Row gutter={16} key={index}>
            <Col xs={24} md={8}>
              <Form.Item label={index === 0 ? "OPTIONS" : " "}>
                <Select placeholder="Size">
                  <Option value="Size">Size</Option>
                  <Option value="Color">Color</Option>
                  <Option value="Material">Material</Option>
                  <Option value="Style">Style</Option>
                </Select>
              </Form.Item>
            </Col>

            <Col xs={24} md={16}>
              <Form.Item label=" ">
                <Input placeholder="Enter tags" />
              </Form.Item>
            </Col>
          </Row>
        ))}

        <Button
          type="link"
          icon={<PlusOutlined />}
          onClick={addRow}
          style={{ padding: 0 }}
        >
          Add another option
        </Button>
      </Form>
    </Card>
  );
};

export default VariantsComponent;
