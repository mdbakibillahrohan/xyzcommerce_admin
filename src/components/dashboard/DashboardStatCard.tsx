import { UserSwitchOutlined } from "@ant-design/icons";

const DashboardStatCard = () => {
  return (
    <div className="p-6 bg-blue-100 rounded-lg shadow-md flex justify-between items-center">
      <div>
        <h3>Total Users</h3>
        <p className="text-2xl font-bold">1,234</p>
      </div>
      <div>
        <UserSwitchOutlined style={{ fontSize: 40 }} />
      </div>
    </div>
  );
};

export default DashboardStatCard;
