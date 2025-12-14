import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SettingOutlined,
  ShopOutlined,
  UserOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Button, Dropdown, Input, Layout, Menu, message, Space } from "antd";
import { Outlet, useNavigate } from "react-router";
import { getCurrentUserInfo, type UserData } from "../services/user.service";
import { logoutUser } from "../services/auth.service";

const { Header, Content, Footer, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  bottom: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
};

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(true);
  const [userData, setUserData] = useState<UserData | null>(null);

  const navigate = useNavigate();

  useEffect(() => {
    getCurrentUserInfo()
      .then((data) => {
        setUserData(data);
      })
      .catch((err) => {
        console.error("Failed to fetch user data:", err);
      });
  }, []);

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

  const menuItems: MenuProps["items"] = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <AppstoreOutlined />,
    },
    { key: "products", label: "Products", icon: <ShopOutlined /> },
  ];

  return (
    <Layout hasSider>
      <Sider collapsed={collapsed} theme="light" style={siderStyle}>
        <div className="flex items-center justify-center h-16">
          <h2 className="text-lg"> {collapsed ? "A" : "E-Commerce Admin"} </h2>
        </div>
        {collapsed ? null : (
          <Input.Search placeholder="Search..." style={{}} className="my-3" />
        )}
        <Menu
          theme="light"
          mode="inline"
          defaultSelectedKeys={["4"]}
          items={menuItems}
          style={{}}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: "#fff" }}>
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
        </Header>
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
