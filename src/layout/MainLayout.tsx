/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useMemo } from "react";
import {
  ShopOutlined,
  DashboardOutlined, // more semantic icon
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Input, Layout, Menu, Spin } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router";
import { getCurrentUserInfo, type UserData } from "../services/user.service";
import HeaderComponent from "../components/layouts/main/HeaderComponent";
import { logoutUser } from "../services/auth.service";

const { Content, Footer, Sider } = Layout;

const siderStyle: React.CSSProperties = {
  overflow: "auto",
  height: "100vh",
  position: "sticky",
  insetInlineStart: 0,
  top: 0,
  scrollbarWidth: "thin",
  scrollbarGutter: "stable",
  borderRight: "1px solid #f0f0f0",
};

type MenuRoute = {
  key: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  // permission?: string; // ← add later for RBAC
};

const menuRoutes: MenuRoute[] = [
  {
    key: "dashboard",
    label: "Dashboard",
    icon: <DashboardOutlined />,
    path: "/dashboard",
  },
  {
    key: "products",
    label: "Products",
    icon: <ShopOutlined />,
    path: "/products",
  },
  {
    key: "categories",
    label: "Categories",
    icon: <ShopOutlined />,
    path: "/categories",
  },
  {
    key: "collections",
    label: "Collections",
    icon: <ShopOutlined />,
    path: "/collections",
  },
  {
    key: "vendors",
    label: "Vendors",
    icon: <ShopOutlined />,
    path: "/vendors",
  },
];

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992); // lg breakpoint

  const navigate = useNavigate();
  const location = useLocation();

  // Handle resize for mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 992);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    let isMounted = true;

    getCurrentUserInfo()
      .then((data) => {
        if (isMounted) {
          setUserData(data);
          setIsCheckingAuth(false);
        }
      })
      .catch((err) => {
        if (err?.status === 401) {
          logoutUser();
          navigate("/login", { replace: true, state: { from: location } });
        } else {
          console.error("Failed to fetch user info:", err);
          // TODO: show global error toast/notification
        }
        if (isMounted) setIsCheckingAuth(false);
      });

    return () => {
      isMounted = false;
    };
  }, [navigate, location]);

  const menuItems = useMemo<MenuProps["items"]>(
    () =>
      menuRoutes.map((route) => ({
        key: route.key,
        icon: route.icon,
        label: route.label,
        onClick: () => navigate(route.path),
      })),
    [navigate]
  );

  const selectedKey = useMemo(() => {
    const route = menuRoutes.find((r) => location.pathname.startsWith(r.path));
    return route?.key || "dashboard";
  }, [location.pathname]);

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <Spin size="large" tip="Authenticating..." />
      </div>
    );
  }

  return (
    <Layout hasSider>
      <Sider
        collapsed={collapsed || isMobile}
        theme="light"
        style={siderStyle}
        width={256}
        collapsedWidth={isMobile ? 0 : 80}
        trigger={isMobile ? null : undefined} // hide default trigger on mobile
      >
        {/* Branding area */}
        <div className="flex h-16 items-center justify-center border-b bg-gray-50/80 px-4">
          {collapsed || isMobile ? (
            <span className="text-2xl font-bold text-indigo-600">E</span>
          ) : (
            <h2 className="truncate text-xl font-semibold tracking-tight text-gray-800">
              E-Commerce Admin
            </h2>
          )}
        </div>

        {/* Search – only shown when not collapsed and not mobile */}
        {!collapsed && !isMobile && (
          <div className="px-4 py-4">
            <Input.Search
              placeholder="Search products, orders..."
              allowClear
              onSearch={(value) => {
                if (value.trim()) {
                  navigate(`/search?q=${encodeURIComponent(value.trim())}`);
                }
              }}
            />
          </div>
        )}

        <Menu
          theme="light"
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          className="border-none"
        />
      </Sider>


      <Layout>
        <HeaderComponent
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          userData={userData}
          isMobile={isMobile} // pass down so header can show mobile menu button if needed
        />

        <Content
          style={{
            margin: "24px 16px 0",
            overflow: "initial",
            minHeight: "calc(100vh - 64px - 70px)", // header + footer rough estimate
          }}
        >
          <Outlet />
        </Content>

        <Footer style={{ textAlign: "center", color: "#888" }}>
          Xyz Commerce © {new Date().getFullYear()} — All rights reserved.
        </Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;