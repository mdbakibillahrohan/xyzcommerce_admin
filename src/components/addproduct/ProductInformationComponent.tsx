/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import{Card, Form,Input, Col,Select,InputNumber,Typography,Row,} from "antd"
import { QuestionCircleOutlined } from "@ant-design/icons";
const { Text } = Typography;

import { useState } from "react";
import ReactQuill from 'react-quill-new'; 
import 'react-quill-new/dist/quill.snow.css';
const ProductInformationComponent = ({setProductInfo}: any) => {
    const [description, _setDescription] = useState("");

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // B I U S
      ["link", "image"], // link & image
      ["blockquote", "code-block"], // quote & code
      [{ list: "ordered" }, { list: "bullet" }], // lists
    ],
  };
const handleChange = (name: string, value: any) => {
    setProductInfo((prev: any) => ({
      ...prev,
      [name]: value
    }));
  };  
  return <div>
      <Card>
        <h3 style={{ marginBottom: 24, fontWeight: 600 }}>
       Product information
      </h3>
        <Form layout="vertical">
            <Form.Item
          label={
            <>
            <h1 className="mr-2 font-semibold">Name</h1>
           <QuestionCircleOutlined />
            </>
          }
          >
            <Input placeholder="Tiro track jacket" 
            onChange={(e) => handleChange('name', e.target.value)}
            />
        </Form.Item>
         <Row gutter={16}><Col span={12}>
            <Form.Item label="SKU" name="sku">
              <Input placeholder="eg. 348121032" onChange={(e) => handleChange('sku', e.target.value)} />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Weight" name="weight">
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                placeholder="0.0"
                onChange={(value) => handleChange('weight', value)}
                addonAfter={
                  <Select defaultValue="kg" onChange={(value) => handleChange('weightUnit', value)}>
                    <Select.Option value="kg">kg</Select.Option>
                    <Select.Option value="g">g</Select.Option>
                    <Select.Option value="lb">lb</Select.Option>
                    <Select.Option value="oz">oz</Select.Option>
                  </Select>
                }
              />
            </Form.Item>

            <Text type="secondary">
              Used to calculate shipping rates at checkout.
            </Text>
          </Col></Row>
           {/* DESCRIPTION */}
           
         <Form.Item label="Description" name="description">
            <ReactQuill
              theme="snow"
              value={description}
              modules={modules}
              placeholder="Type your description..."
              style={{ height: "250px" }} // height set korlam
              onChange={(content) => handleChange('description', content)}
            />
          </Form.Item>
        </Form>
      </Card>
  </div>
}

export default ProductInformationComponent
