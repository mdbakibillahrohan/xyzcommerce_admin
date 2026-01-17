import { Button, message } from "antd"; // message যোগ করা হয়েছে এলার্ট দেখানোর জন্য
import { CopyOutlined, EyeOutlined, SaveOutlined } from "@ant-design/icons"; // SaveOutlined আইকন
import ProductInformationComponent from "../components/addproduct/ProductInformationComponent";
import PricingComponent from "../components/addproduct/PricingComponent";
import OrganizationComponent from "../components/addproduct/OrganizationComponent";
import MediaComponent from "../components/addproduct/MediaComponent";
import VariantsComponent from "../components/addproduct/VariantsComponent";
import { useNavigate } from "react-router"; 

const AddProductPage = () => {
  const navigate = useNavigate();

  
  const handleSave = () => {
    
    message.success("Product saved successfully!");
    
    navigate("/products"); 
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
            <h1 className="text-2xl font-semibold text-gray-90 p-1">Add Product</h1>
          </div>
          
          {/* button section */}
          <div className="flex gap-3 mt-2">
            <Button icon={<CopyOutlined />}>Duplicate</Button>
            <Button icon={<EyeOutlined />}>Preview</Button>
            
            <Button 
              type="primary" 
              icon={<SaveOutlined />} 
              onClick={handleSave}
              style={{ backgroundColor: '#1677ff' }}
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
            <ProductInformationComponent />
          </div>
          <div className="mt-2">
            <MediaComponent />
          </div>
          <div className="mt-2">
            <VariantsComponent />
          </div>
        </div>

        <div className="col-span-2 mt-3">
          <div>
            <PricingComponent />
          </div>
          <div className="pt-3.5">
            <OrganizationComponent />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProductPage;