/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Button,
  Breadcrumb,
  Divider,
  Space,
} from "antd";
import {
  CopyOutlined,
  EyeOutlined,
  SaveOutlined,
} from "@ant-design/icons";

import ProductInformationComponent from "../components/addproduct/ProductInformationComponent";
import PricingComponent from "../components/addproduct/PricingComponent";
import OrganizationComponent from "../components/addproduct/OrganizationComponent";
import MediaComponent from "../components/addproduct/MediaComponent";
import VariantsComponent from "../components/addproduct/VariantsComponent";

import { useNavigate } from "react-router";
import  { useState } from "react";
import { message } from "antd";
import { createProduct } from "../services/product.service";

const AddProductPage = () => {
  const [uploadedImagePath, setUploadedImagePath] = useState<string | null>(null);

  const [price, setPrice] = useState<any>({
    amount: 0,
    currency: "BDT",
  });

  const [productInfo, setProductInfo] = useState({
    name: "",
    sku: "",
    weight: "",
    product_descriptions: "",
  });

  const [organization, setOrganization] = useState({
    vendor_id: null,
    category_id: null,
    collection_id: null,
  });

  const navigate = useNavigate();

  const handleSave = async () => {
    const finalData = {
      productInfo: {
        ...productInfo,
        weight: Number(productInfo.weight) || 0,
      },
      price: {
        amount: Number(price.amount) || 0,
        currency: price.currency,
      },
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
        message.success("Product saved successfully");
        navigate("/products");
      }
    } catch (error: any) {
      message.error(error.response?.data?.message || "Failed to save product");
    }
  };

  return (
    <div className="px-6 py-4 bg-[#f5f7fa] min-h-screen">
      {/* Page Header */}
      <div className="bg-white rounded-xl px-6 py-5 shadow-sm mb-6">
        <div className="flex justify-between items-start">
          <div>
            <Breadcrumb
              items={[
                { title: "Products" },
                { title: "Add Product" },
              ]}
            />
            <h1 className="text-2xl font-semibold text-gray-900 mt-2">
              Add Product
            </h1>
            <p className="text-sm text-gray-500">
              Create and configure a new product for your store
            </p>
          </div>

          <Space>
            <Button icon={<CopyOutlined />}>Duplicate</Button>
            <Button icon={<EyeOutlined />}>Preview</Button>
            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleSave}
            >
              Save Product
            </Button>
          </Space>
        </div>
      </div>

      {/* Content */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Left Section */}
        <div className="xl:col-span-8 space-y-6">
          <ProductInformationComponent
            productInfo={productInfo}
            setProductInfo={setProductInfo}
          />

          <MediaComponent
            uploadedImagePath={uploadedImagePath}
            setUploadedImagePath={setUploadedImagePath}
          />

          <VariantsComponent />
        </div>

        {/* Right Section */}
        <div className="xl:col-span-4 space-y-6">
          <PricingComponent price={price} setPrice={setPrice} />
          <OrganizationComponent
            organization={organization}
            setOrganization={setOrganization}
          />
        </div>
      </div>

      <Divider className="mt-10" />
    </div>
  );
};

export default AddProductPage;
