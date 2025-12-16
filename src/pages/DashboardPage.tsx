import { Button } from "antd";
import { RollbackOutlined } from "@ant-design/icons";
import DashboardStatCard from "../components/dashboard/DashboardStatCard";
import SalesOverviewComponent from "../components/dashboard/SalesOverviewComponent";
import OrderStatusComponent from "../components/dashboard/OrderStatusComponent";

const DashboardPage = () => {
  return (
    <div className="p-8 bg-white">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
          <p>Welcome to the admin dashboard! </p>
        </div>
        <div>
          <Button icon={<RollbackOutlined />} type="primary">
            Refresh
          </Button>
        </div>
      </div>
      <div className="grid grid-cols-1 py-5 gap-6 md:grid-cols-4">
        <DashboardStatCard/>
        <DashboardStatCard/>
        <DashboardStatCard/>
        <DashboardStatCard/>
      </div>
      <div className="grid grid-cols-6 gap-6">
        <div className="col-span-4"><SalesOverviewComponent /></div>
        <div className="col-span-2"><OrderStatusComponent /></div>
      </div>
    </div>
  );
};

export default DashboardPage;
