/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState, useMemo } from "react";
import {
  ShopOutlined,
  DashboardOutlined,
  AppstoreOutlined,
  TagsOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, Spin, ConfigProvider, theme, Button } from "antd";
import { Outlet, useLocation, useNavigate } from "react-router";
import { getCurrentUserInfo, type UserData } from "../services/user.service";
import HeaderComponent from "../components/layouts/main/HeaderComponent";
import { logoutUser } from "../services/auth.service";

const { Content, Footer, Sider } = Layout;

const menuRoutes = [
  { key: "dashboard", label: "Dashboard", icon: <DashboardOutlined />, path: "/dashboard" },
  { key: "products", label: "Products", icon: <ShopOutlined />, path: "/products" },
  { key: "categories", label: "Categories", icon: <AppstoreOutlined />, path: "/categories" },
  { key: "collections", label: "Collections", icon: <TagsOutlined />, path: "/collections" },
  { key: "vendors", label: "Vendors", icon: <TeamOutlined />, path: "/vendors" },
];

const MainLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 992);

  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 992);
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
          navigate("/login", { replace: true });
        }
        if (isMounted) setIsCheckingAuth(false);
      });
    return () => { isMounted = false; };
  }, [navigate]);

  const menuItems = useMemo<MenuProps["items"]>(() =>
    menuRoutes.map((route) => ({
      key: route.key,
      icon: route.icon,
      label: <span className="menu-label">{route.label}</span>,
      onClick: () => navigate(route.path),
    })), [navigate]
  );

  const selectedKey = useMemo(() => {
    const route = menuRoutes.find((r) => location.pathname.startsWith(r.path));
    return route?.key || "dashboard";
  }, [location.pathname]);

  if (isCheckingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0a0f18]">
        <div className="loader-pulse"></div>
        <Spin size="large" tip={<span style={{ color: '#6366f1', marginTop: 20 }}>Initializing Core...</span>} />
      </div>
    );
  }

  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#6366f1",
          borderRadius: 14,
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        },
        components: {
          Layout: {
            headerBg: "rgba(10, 15, 24, 0.7)",
            bodyBg: "#0a0f18", // Deep Industrial Dark
          },
          Menu: {
            darkItemBg: "transparent",
            darkItemSelectedBg: "rgba(99, 102, 241, 0.15)",
            darkItemColor: "#94a3b8",
            darkItemSelectedColor: "#fff",
          }
        }
      }}
    >
      <Layout hasSider style={{ minHeight: "100vh", background: "#0a0f18" }}>
        {/* Sidebar with Glass Effect */}
        <Sider
          collapsed={collapsed}
          onCollapse={(value) => setCollapsed(value)}
          breakpoint="lg"
          collapsedWidth={isMobile ? 0 : 85}
          width={280}
          theme="dark"
          className="industrial-sider"
        >
          <div className="brand-header">
            <div className="logo-box">
              <ShopOutlined />
            </div>
            {!collapsed && <h2 className="brand-text">Astra <span className="neon-text">UI</span></h2>}
          </div>

          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[selectedKey]}
            items={menuItems}
            className="custom-menu"
          />

          {!collapsed && (
            <div className="sidebar-footer">
              <div className="support-card">
                <p>Advanced System</p>
                <Button type="primary" block className="neon-btn">v2.0 PRO</Button>
              </div>
            </div>
          )}
        </Sider>

        <Layout className="main-render-area">
          <HeaderComponent
            collapsed={collapsed}
            setCollapsed={setCollapsed}
            userData={userData}
            isMobile={isMobile}
          />

          <Content className="content-scroller">
            <div className="content-glass-canvas">
              <Outlet />
            </div>
          </Content>

          <Footer className="industrial-footer">
            <p>©{new Date().getFullYear()} Astra Industrial Dashboard. Engineered with precision.</p>
          </Footer>
        </Layout>
      </Layout>

      <style dangerouslySetInnerHTML={{ __html: `
        /* Background Mesh Glow */
        .main-render-area {
          background: radial-gradient(circle at 50% 0%, #1e293b 0%, #0a0f18 100%) !important;
          position: relative;
        }

        .industrial-sider {
          background: rgba(15, 23, 42, 0.8) !important;
          backdrop-filter: blur(20px);
          border-right: 1px solid rgba(255,255,255,0.05) !important;
        }

        .brand-header {
          height: 100px; display: flex; align-items: center; padding: 0 24px; gap: 15px;
        }

        .logo-box {
          width: 42px; height: 42px; background: #6366f1; border-radius: 12px;
          display: flex; align-items: center; justify-content: center; font-size: 20px;
          box-shadow: 0 0 20px rgba(99, 102, 241, 0.5);
        }

        .brand-text { color: #fff; margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.5px; }
        .neon-text { color: #6366f1; text-shadow: 0 0 10px rgba(99, 102, 241, 0.5); }

        .custom-menu { background: transparent !important; margin-top: 10px; }
        .ant-menu-item { height: 50px !important; line-height: 50px !important; margin: 8px 12px !important; border-radius: 12px !important; }
        
        .ant-menu-item-selected {
          background: linear-gradient(90deg, rgba(99, 102, 241, 0.2), transparent) !important;
          border-left: 3px solid #6366f1 !important;
        }

        .content-scroller { padding: 24px; overflow-y: auto; }

        /* Content Canvas */
        .content-glass-canvas {
          background: rgba(15, 23, 42, 0.4);
          backdrop-filter: blur(10px);
          border-radius: 28px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 30px;
          min-height: 85vh;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
        }

        .sidebar-footer { padding: 24px; position: absolute; bottom: 0; width: 100%; }
        .support-card { background: rgba(255,255,255,0.03); padding: 16px; border-radius: 16px; border: 1px solid rgba(255,255,255,0.05); }
        .support-card p { color: #64748b; font-size: 11px; margin-bottom: 10px; text-transform: uppercase; letter-spacing: 1px; }

        .neon-btn { background: #6366f1 !important; border: none !important; box-shadow: 0 0 15px rgba(99, 102, 241, 0.4); }

        .industrial-footer { background: transparent !important; color: #475569; text-align: center; padding: 20px; font-size: 12px; }

        /* Animations */
        @keyframes meshFlow {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}} />
    </ConfigProvider>
  );
};

export default MainLayout;