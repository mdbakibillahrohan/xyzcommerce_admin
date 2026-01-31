/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Breadcrumb, Divider, Space, message, ConfigProvider } from "antd";
import { CopyOutlined, EyeOutlined, SaveOutlined, ArrowLeftOutlined, ShakeOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { useState } from "react";
import { createProduct } from "../services/product.service";

// Components
import ProductInformationComponent from "../components/addproduct/ProductInformationComponent";
import PricingComponent from "../components/addproduct/PricingComponent";
import OrganizationComponent from "../components/addproduct/OrganizationComponent";
import MediaComponent from "../components/addproduct/MediaComponent";
import VariantsComponent from "../components/addproduct/VariantsComponent";

const AddProductPage = () => {
  const [uploadedImagePath, setUploadedImagePath] = useState<string | null>(null);
  const [price, setPrice] = useState<any>({ amount: 0, currency: "BDT" });
  const [productInfo, setProductInfo] = useState({ name: "", sku: "", weight: "" });
  const [organization, setOrganization] = useState({ vendor_id: null, category_id: null, collection_id: null });

  const navigate = useNavigate();

  const handleSave = async () => {
    const finalData = {
      productInfo: { ...productInfo, weight: Number(productInfo.weight) || 0 },
      price: { amount: Number(price.amount) || 0, currency: price.currency },
      organization: {
        vendor_id: Number(organization.vendor_id),
        category_id: Number(organization.category_id),
        collection_id: Number(organization.collection_id),
      },
      uploadedImagePath,
    };

    try {
      const response = await createProduct(finalData);
      if (response.data?.success || response.status === 201) {
        message.success("Product secured in vault successfully!");
        navigate("/products");
      }
    } catch (error: any) {
      message.error(error.response?.data?.message || "Transmission failed");
    }
  };

  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgLayout: '#020617',
          colorPrimary: '#6366f1',
          borderRadius: 16,
        }
      }}
    >
      <div className="add-product-container">
        {/* Background Decorative Blobs */}
        <div className="bg-glow-blob" />

        {/* Floating Glass Header */}
        <div className="sticky-header-glass">
          <div className="header-content-flex">
            <div className="title-section">
              <Button 
                type="text" 
                icon={<ArrowLeftOutlined />} 
                onClick={() => navigate("/products")}
                className="back-btn-hover"
              />
              <div className="breadcrumb-area">
                <Breadcrumb
                  items={[{ title: "Vault" }, { title: "Inventory" }, { title: "New Core" }]}
                  className="custom-breadcrumb"
                />
                <h1 className="page-main-title">
                  Configure New Asset <ShakeOutlined className="sparkle-icon" />
                </h1>
              </div>
            </div>

            <Space size={12}>
              <Button className="secondary-glass-btn" icon={<CopyOutlined />}>Clone</Button>
              <Button className="secondary-glass-btn" icon={<EyeOutlined />}>Preview</Button>
              <Button
                type="primary"
                className="primary-save-btn"
                icon={<SaveOutlined />}
                onClick={handleSave}
              >
                Deploy Product
              </Button>
            </Space>
          </div>
        </div>

        {/* Dynamic Grid Content */}
        <div className="main-content-grid">
          <div className="left-column-stack">
            <div className="anim-fade-up" style={{ animationDelay: '0.1s' }}>
              <ProductInformationComponent setProductInfo={setProductInfo} />
            </div>
            
            <div className="anim-fade-up" style={{ animationDelay: '0.2s' }}>
              <MediaComponent setUploadedImagePath={setUploadedImagePath} />
            </div>

            <div className="anim-fade-up" style={{ animationDelay: '0.3s' }}>
              <VariantsComponent />
            </div>
          </div>

          <div className="right-column-stack">
            <div className="anim-fade-up" style={{ animationDelay: '0.4s' }}>
              <PricingComponent price={price} setPrice={setPrice} />
            </div>
            
            <div className="anim-fade-up" style={{ animationDelay: '0.5s' }}>
              <OrganizationComponent organization={organization} setOrganization={setOrganization} />
            </div>
            
            {/* New: Status Card Suggestion */}
            <div className="status-indicator-card anim-fade-up" style={{ animationDelay: '0.6s' }}>
               <div className="pulse-dot" />
               <span>Ready for deployment to global store</span>
            </div>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          .add-product-container {
            min-height: 100vh;
            background: #020617;
            padding: 0 40px 60px;
            position: relative;
            overflow-x: hidden;
          }

          /* Abstract Background Glow */
          .bg-glow-blob {
            position: absolute; width: 500px; height: 500px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%);
            top: -100px; right: -100px; z-index: 0; pointer-events: none;
          }

          /* Sticky Glass Header */
          .sticky-header-glass {
            position: sticky; top: 0; z-index: 100;
            background: rgba(15, 23, 42, 0.7);
            backdrop-filter: blur(20px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.05);
            margin: 0 -40px 32px;
            padding: 20px 40px;
          }

          .header-content-flex { display: flex; justify-content: space-between; align-items: center; max-width: 1600px; margin: 0 auto; }
          .title-section { display: flex; align-items: center; gap: 20px; }
          .page-main-title { color: #fff; font-size: 24px; font-weight: 800; margin: 0; letter-spacing: -0.5px; }
          .sparkle-icon { color: #f59e0b; font-size: 18px; margin-left: 8px; }

          /* Custom Buttons */
          .secondary-glass-btn {
            background: rgba(255, 255, 255, 0.03) !important;
            border: 1px solid rgba(255, 255, 255, 0.08) !important;
            color: #94a3b8 !important;
            border-radius: 12px !important;
            font-weight: 600 !important;
          }
          .secondary-glass-btn:hover { color: #fff !important; border-color: #6366f1 !important; }

          .primary-save-btn {
            background: #6366f1 !important;
            border: none !important;
            border-radius: 12px !important;
            height: 42px !important;
            padding: 0 24px !important;
            font-weight: 700 !important;
            box-shadow: 0 8px 20px rgba(99, 102, 241, 0.3) !important;
          }

          /* Grid Layout */
          .main-content-grid {
            display: grid; grid-template-columns: 2fr 1fr; gap: 32px;
            max-width: 1600px; margin: 0 auto; position: relative; z-index: 1;
          }

          .left-column-stack, .right-column-stack { display: flex; flex-direction: column; gap: 32px; }

          /* Animations */
          .anim-fade-up {
            opacity: 0; transform: translateY(30px);
            animation: fadeUp 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
          }

          @keyframes fadeUp {
            to { opacity: 1; transform: translateY(0); }
          }

          /* Status Card */
          .status-indicator-card {
            background: rgba(16, 185, 129, 0.05);
            border: 1px solid rgba(16, 185, 129, 0.2);
            padding: 16px; border-radius: 16px;
            display: flex; align-items: center; gap: 12px;
            color: #10b981; font-weight: 600; font-size: 13px;
          }

          .pulse-dot {
            width: 8px; height: 8px; background: #10b981; border-radius: 50%;
            box-shadow: 0 0 10px #10b981; animation: pulse 2s infinite;
          }

          @keyframes pulse { 0% { transform: scale(1); opacity: 1; } 50% { transform: scale(1.5); opacity: 0.5; } 100% { transform: scale(1); opacity: 1; } }

          @media (max-width: 1200px) { .main-content-grid { grid-template-columns: 1fr; } }
        `}} />
      </div>
    </ConfigProvider>
  );
};

export default AddProductPage;