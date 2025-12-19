import { Button } from "antd";
import { CopyOutlined, EyeOutlined } from "@ant-design/icons";
import ProductInformationComponent from "../components/addproduct/ProductInformationComponent";
import PricingComponent from "../components/addproduct/PricingComponent";
import OrganizationComponent from "../components/addproduct/OrganizationComponent";
import MediaComponent from "../components/addproduct/MediaComponent";
import VariantsComponent from "../components/addproduct/VariantsComponent";

const AddProductPage = () => {
  return (
    <div className="m-2">
      {/* header */}
      <div className="bg-white  rounded-md px-6 py-4 shadow-sm">
        <span>
          <a href="" className="hover:underline text-gray-500">
            Product
          </a>
          /Add Product
        </span>
        <h1 className="text-2xl font-semibold text-gray-90 p-1">Add Product</h1>
        <div className="flex gap-3 mt-2">
          <Button icon={<CopyOutlined />}>Duplicate</Button>
          <Button icon={<EyeOutlined />}>Preview</Button>
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
