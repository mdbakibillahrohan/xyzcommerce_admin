
import{Card, Form,Input, Col,Select,InputNumber,Typography,Row,} from "antd"
import { QuestionCircleOutlined } from "@ant-design/icons";
const { Text } = Typography;

import { useState } from "react";
import ReactQuill from 'react-quill-new'; 
import 'react-quill-new/dist/quill.snow.css';
const ProductInformationComponent = () => {
    const [description, setDescription] = useState("");

  const modules = {
    toolbar: [
      ["bold", "italic", "underline", "strike"], // B I U S
      ["link", "image"], // link & image
      ["blockquote", "code-block"], // quote & code
      [{ list: "ordered" }, { list: "bullet" }], // lists
    ],
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
            <Input placeholder="Tiro track jacket" />
        </Form.Item>
         <Row gutter={16}><Col span={12}>
            <Form.Item label="SKU" name="sku">
              <Input placeholder="eg. 348121032" />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item label="Weight" name="weight">
              <InputNumber
                min={0}
                style={{ width: "100%" }}
                placeholder="0.0"
                addonAfter={
                  <Select defaultValue="kg">
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
              onChange={setDescription}
              modules={modules}
              placeholder="Type your description..."
              style={{ height: "250px" }} // height set korlam
            />
          </Form.Item>
   

        </Form>
      </Card>
  </div>
}

export default ProductInformationComponent
