
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "antd"; // message যোগ করা হয়েছে এলার্ট দেখানোর জন্য
import { CopyOutlined, EyeOutlined, SaveOutlined } from "@ant-design/icons"; // SaveOutlined আইকন
import ProductInformationComponent from "../components/addproduct/ProductInformationComponent";
import PricingComponent from "../components/addproduct/PricingComponent";
import OrganizationComponent from "../components/addproduct/OrganizationComponent";
import MediaComponent from "../components/addproduct/MediaComponent";
import VariantsComponent from "../components/addproduct/VariantsComponent";
import { useNavigate } from "react-router";
import React, { useState } from "react";
import { message } from "antd";
import { createProduct } from "../services/product.service";

const AddProductPage = () => {
  const [uploadedImagePath, setUploadedImagePath] = React.useState<
    string | null
  >(null);
  const [price, setPrice] = useState<any>({
    amount: 0,
    currency: "BDT",
  });
  const [productInfo, setProductInfo] = useState({
     name: '',
      sku: '',
       weight: '',
        product_descriptions: '' });
  const [organization, setOrganization] = useState({
  vendor: null,
  category: null,
  collections: []
});

  const navigate = useNavigate();

const handleSave = async () => {

  const finalData = {
    productInfo: {
      name: productInfo.name,
      sku: productInfo.sku,
      weight: Number(productInfo.weight) || 0,  
      product_descriptions: productInfo.product_descriptions || '',
    },
    price: {
      amount: Number(price.amount) || 0,
      currency: price.currency || "BDT",
    },
    organization: {
      vendor: organization.vendor ? Number(organization.vendor) : null,
      category: Number(organization.category), 
      collections: organization.collections || []
    },
    uploadedImagePath: uploadedImagePath || null
  };

  try {
  
    const response = await createProduct(finalData); 
    
    // backend a theke success data chek
    if (response.data?.success || response.status === 201) {
      message.success("Product saved successfully!");
      navigate("/products");
    }
  } catch (error: any) {
    
    console.error("Save error details:", error.response?.data);
    const errorMessage = error.response?.data?.message || "Failed to save product";
    message.error(errorMessage);
  }
};

  return (
    <div className="m-2">
      {/* header */}
      <div className="bg-white rounded-md px-6 py-4 shadow-sm">
        <div className="flex justify-between items-center">
          <div>
            <span>
              <a href="" className="hover:underline text-gray-500">
                Product
              </a>
              /Add Product
            </span>
            <h1 className="text-2xl font-semibold text-gray-90 p-1">
              Add Product
            </h1>
          </div>

          {/* button section */}
          <div className="flex gap-3 mt-2">
            <Button icon={<CopyOutlined />}>Duplicate</Button>
            <Button icon={<EyeOutlined />}>Preview</Button>

            <Button
              type="primary"
              icon={<SaveOutlined />}
              onClick={handleSave}
              style={{ backgroundColor: "#1677ff" }}
            >
              Save Product
            </Button>
          </div>
        </div>
      </div>

      {/* main section */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        <div className="col-span-4 mt-3">
          <div>
            <ProductInformationComponent 
            productInfo={productInfo}
            setProductInfo={setProductInfo}
            />
          </div>
          <div className="mt-2">
            <MediaComponent
              uploadedImagePath={uploadedImagePath}
              setUploadedImagePath={setUploadedImagePath}
            />
          </div>
          <div className="mt-2">
            <VariantsComponent />
          </div>
        </div>

        <div className="col-span-2 mt-3">
          <div>
            <PricingComponent price={price} setPrice={setPrice} />
          </div>
          <div className="pt-3.5">
            <OrganizationComponent
             organization={organization}
             setOrganization={setOrganization}
             
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;
