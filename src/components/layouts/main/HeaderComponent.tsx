/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Dropdown, Input, message, Space, type MenuProps } from "antd";
import { Header } from "antd/es/layout/layout";
import {MenuFoldOutlined, MenuUnfoldOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";
import { logoutUser } from "../../../services/auth.service";
import { useNavigate } from "react-router";

const HeaderComponent = ({userData, setCollapsed, collapsed}:any) => {
    const navigate=useNavigate();
    const dropdownItems: MenuProps["items"] = [
    {
      key: "my-account",
      label: "My Account",
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "profile",
      label: "Profile",
      extra: "⌘P",
    },
    {
      key: "billing",
      label: "Billing",
      extra: "⌘B",
    },
    {
      key: "settings",
      label: "Settings",
      icon: <SettingOutlined />,
      extra: "⌘S",
    },
    {
      type: "divider",
    },
    {
      key: "logout",
      label: "Logout",
    },
  ];

  const handleUserDropdownMenuClick = ({ key }: { key: string }) => {
    if(key==="logout"){
      // Implement logout functionality here
      const isLoggedOut = logoutUser();
      if (isLoggedOut) {
        navigate("/login");
      }else{
        console.error("Logout failed");
        message.error("Logout failed. Please try again.");
      }
    }

  };
  return <Header style={{ padding: 0, background: "#fff" }}>
          {/* You can add header content here if needed */}
          <div className="flex justify-between items-center h-16">
            <div>
              <Button
                onClick={() => {
                  setCollapsed(!collapsed);
                }}
                type="text"
                icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              />
            </div>
            <div>
              <Input.Search placeholder="Search..." style={{ width: 400 }} />
            </div>
            <div>
              <Dropdown
                menu={{ items: dropdownItems, onClick: handleUserDropdownMenuClick }}
                placement="bottom"
                arrow
                trigger={["click"]}
              >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    <span className="mr-4">
                      {userData?.username || "Admin User"}
                    </span>
                    <UserOutlined
                      style={{ fontSize: "20px", marginRight: "16px" }}
                    />
                  </Space>
                </a>
              </Dropdown>
            </div>
          </div>
        </Header>;
}

export default HeaderComponent;