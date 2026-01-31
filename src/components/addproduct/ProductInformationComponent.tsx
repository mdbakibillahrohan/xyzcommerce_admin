/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Card, Form, Input, Col, Select, InputNumber, Typography, Row } from "antd";
import { QuestionCircleOutlined, InfoCircleOutlined, EditOutlined } from "@ant-design/icons";
import { useState } from "react";
import ReactQuill from 'react-quill-new'; 
import 'react-quill-new/dist/quill.snow.css';

const { Text } = Typography;

const ProductInformationComponent = ({ setProductInfo }: any) => {
  const [description, setDescription] = useState("");

  const modules = {
    toolbar: [
      [{ 'header': [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ 'color': [] }, { 'background': [] }],
      ["link", "blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      ["clean"],
    ],
  };

  const handleChange = (name: string, value: any) => {
    if (name === 'description') setDescription(value);
    setProductInfo((prev: any) => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="product-info-container">
      <Card className="cyber-glass-card">
        {/* Header with Gradient Underline */}
        <div className="card-header-wrapper">
          <div className="header-title-group">
            <EditOutlined className="header-icon" />
            <h3 className="gradient-title">Product Information</h3>
          </div>
          <InfoCircleOutlined className="info-icon-glow" />
        </div>

        <Form layout="vertical" className="animated-form">
          {/* PRODUCT NAME SECTION */}
          <div className="form-section fade-in-up" style={{ animationDelay: '0.1s' }}>
            <Form.Item
              label={
                <span className="cyber-label">
                  NAME <QuestionCircleOutlined className="label-hint" />
                </span>
              }
            >
              <Input 
                placeholder="e.g. Premium Wireless Audio" 
                className="cyber-input"
                onChange={(e) => handleChange('name', e.target.value)}
              />
            </Form.Item>
          </div>

          <Row gutter={24}>
            {/* SKU SECTION */}
            <Col span={12} className="fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Form.Item label={<span className="cyber-label">SKU IDENTIFIER</span>}>
                <Input 
                  placeholder="ID-882910" 
                  className="cyber-input"
                  onChange={(e) => handleChange('sku', e.target.value)} 
                />
              </Form.Item>
            </Col>

            {/* WEIGHT SECTION */}
            <Col span={12} className="fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Form.Item label={<span className="cyber-label">LOGISTICS WEIGHT</span>}>
                <InputNumber
                  min={0}
                  className="cyber-input-number"
                  placeholder="0.00"
                  onChange={(value) => handleChange('weight', value)}
                  addonAfter={
                    <Select 
                      defaultValue="kg" 
                      className="unit-selector-glass"
                      onChange={(value) => handleChange('weightUnit', value)}
                    >
                      <Select.Option value="kg">kg</Select.Option>
                      <Select.Option value="g">g</Select.Option>
                      <Select.Option value="lb">lb</Select.Option>
                    </Select>
                  }
                />
              </Form.Item>
              <Text className="shipping-helper">Automates shipping rate calculation at checkout.</Text>
            </Col>
          </Row>

          {/* DESCRIPTION SECTION */}
          <div className="form-section fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Form.Item label={<span className="cyber-label">RICH DESCRIPTION</span>}>
              <div className="quill-wrapper-neon">
                <ReactQuill
                  theme="snow"
                  value={description}
                  modules={modules}
                  placeholder="Craft your product story here..."
                  onChange={(content) => handleChange('description', content)}
                />
              </div>
            </Form.Item>
          </div>
        </Form>
      </Card>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Main Card Styling */
        .cyber-glass-card {
          background: rgba(15, 23, 42, 0.4) !important;
          backdrop-filter: blur(12px);
          border: 1px solid rgba(99, 102, 241, 0.2) !important;
          border-radius: 20px !important;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5) !important;
          overflow: hidden;
        }

        /* Header Animation & Style */
        .card-header-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 30px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          padding-bottom: 15px;
        }
        .header-title-group { display: flex; align-items: center; gap: 10px; }
        .header-icon { color: #6366f1; font-size: 20px; }
        .gradient-title {
          margin: 0;
          font-weight: 700;
          background: linear-gradient(90deg, #fff, #6366f1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .info-icon-glow { color: #475569; cursor: help; transition: 0.3s; }
        .info-icon-glow:hover { color: #6366f1; filter: drop-shadow(0 0 5px #6366f1); }

        /* Label and Inputs */
        .cyber-label {
          color: #94a3b8 !important;
          font-size: 11px !important;
          font-weight: 800 !important;
          letter-spacing: 1px;
          text-transform: uppercase;
        }
        .label-hint { color: #6366f1; margin-left: 5px; }

        .cyber-input, .cyber-input-number {
          background: rgba(0, 0, 0, 0.2) !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 10px !important;
          color: #fff !important;
          transition: 0.3s all cubic-bezier(0.4, 0, 0.2, 1) !important;
        }
        .cyber-input:focus, .cyber-input-number:focus-within {
          border-color: #6366f1 !important;
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.2) !important;
          background: rgba(0, 0, 0, 0.3) !important;
        }

        /* Shipping Helper Text */
        .shipping-helper {
          font-size: 11px;
          color: #475569;
          display: block;
          margin-top: 5px;
          font-style: italic;
        }

        /* Quill Editor Modernization */
        .quill-wrapper-neon {
          background: rgba(0, 0, 0, 0.2);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          overflow: hidden;
        }
        .ql-toolbar.ql-snow {
          background: rgba(255, 255, 255, 0.02) !important;
          border: none !important;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
        }
        .ql-container.ql-snow {
          border: none !important;
          min-height: 200px;
          color: #e2e8f0 !important;
        }
        .ql-stroke { stroke: #94a3b8 !important; }
        .ql-picker { color: #94a3b8 !important; }

        /* Unit Selector */
        .unit-selector-glass .ant-select-selector {
          background: rgba(99, 102, 241, 0.1) !important; 
          border: none !important;
          color: #6366f1 !important;
          font-weight: 700 !important;
        }

        /* Animations */
        .fade-in-up {
          opacity: 0;
          transform: translateY(20px);
          animation: fadeInUp 0.5s ease-out forwards;
        }
        @keyframes fadeInUp {
          to { opacity: 1; transform: translateY(0); }
        }
      `}} />
    </div>
  );
};

export default ProductInformationComponent;