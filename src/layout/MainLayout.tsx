import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import {   Input, Layout, Menu } from "antd";
import { Outlet, useNavigate } from "react-router";
import { getCurrentUserInfo, type UserData } from "../services/user.service";
import HeaderComponent from "../components/layouts/main/HeaderComponent";

const {  Content, Footer, Sider } = Layout;

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
  const [collapsed, setCollapsed] = useState(false);
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

  

  

  const menuItems: MenuProps["items"] = [
    {
      key: "dashboard",
      label: "Dashboard",
      icon: <AppstoreOutlined />,
      onClick: () => navigate("/dashboard"),
    },
    { key: "products", 
      label: "Products", 
      icon: <ShopOutlined />, 
      onClick: () => navigate("/products") 
    },
    { key: "categories", 
      label: "Categories", 
      icon: <ShopOutlined />, 
      onClick: () => navigate("/categories") 
    },
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
        <HeaderComponent collapsed={collapsed} setCollapsed={setCollapsed} userData={userData} />
        <Content style={{ margin: "24px 16px 0", overflow: "initial" }}>
          <Outlet />
        </Content>
        <Footer style={{ textAlign: "center" }}>
          
          Xyz Commerce ©{new Date().getFullYear()} All rights reserved.
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
