import React from "react";
import { Button, Row, Col } from "antd";
import { 
  ReloadOutlined, 
  UserOutlined, 
  ShoppingCartOutlined, 
  ShoppingOutlined, 
  DollarOutlined 
} from "@ant-design/icons";
import DashboardStatCard from "../components/dashboard/DashboardStatCard";
import SalesOverviewComponent from "../components/dashboard/SalesOverviewComponent";
import OrderStatusComponent from "../components/dashboard/OrderStatusComponent";

const DashboardPage = () => {
  return (
    <div className="dashboard-wrapper">
      {/* Background Decorative Elements */}
      <div className="bg-glow-1"></div>
      <div className="bg-glow-2"></div>

      <div className="content-container">
        {/* Header Section */}
        <div className="header-flex">
          <div className="title-area">
            <h1 className="main-title">Dashboard</h1>
            <p className="sub-title">Welcome back! Here's what's happening with your store.</p>
          </div>
          <div className="action-area">
            <div className="time-filters">
              <span className="filter-item">Today</span>
              <span className="filter-item">Week</span>
              <span className="filter-item active">Month</span>
              <span className="filter-item">Year</span>
            </div>
            <Button 
              icon={<ReloadOutlined className="spin-on-hover" />} 
              className="refresh-btn"
            >
              Refresh
            </Button>
          </div>
        </div>

        {/* 4 Stat Cards Grid */}
        <Row gutter={[20, 20]} className="stats-row">
          <Col xs={24} sm={12} lg={6}>
            <DashboardStatCard title="Total Users" value="0" icon={<UserOutlined />} color="#6366f1" trend="+0% today" />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <DashboardStatCard title="Total Orders" value="0" icon={<ShoppingCartOutlined />} color="#22c55e" trend="+0% today" />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <DashboardStatCard title="Total Products" value="0" icon={<ShoppingOutlined />} color="#f59e0b" trend="+0% today" />
          </Col>
          <Col xs={24} sm={12} lg={6}>
            <DashboardStatCard title="Total Revenue" value="BDT 0" icon={<DollarOutlined />} color="#ec4899" trend="+BDT 0 today" />
          </Col>
        </Row>

        {/* Overview & Status Section */}
        <Row gutter={[20, 20]} className="charts-row">
          <Col xs={24} lg={16}>
            <div className="glass-panel">
              <SalesOverviewComponent />
            </div>
          </Col>
          <Col xs={24} lg={8}>
            <div className="glass-panel">
              <OrderStatusComponent />
            </div>
          </Col>
        </Row>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .dashboard-wrapper {
          min-height: 100vh;
          background: #0a0f18; /* Deep Industrial Dark */
          padding: 40px;
          position: relative;
          overflow: hidden;
          color: #fff;
        }

        /* Decorative Glows */
        .bg-glow-1 { position: absolute; top: -10%; left: -10%; width: 400px; height: 400px; background: rgba(99, 102, 241, 0.05); filter: blur(100px); border-radius: 50%; }
        .bg-glow-2 { position: absolute; bottom: -10%; right: -10%; width: 400px; height: 400px; background: rgba(236, 72, 153, 0.05); filter: blur(100px); border-radius: 50%; }

        .content-container { position: relative; z-index: 10; max-width: 1600px; margin: 0 auto; }

        .header-flex { display: flex; justify-content: space-between; align-items: flex-end; margin-bottom: 32px; flex-wrap: wrap; gap: 20px; }
        
        .main-title { font-size: 32px; font-weight: 800; color: #fff; margin: 0; letter-spacing: -1px; }
        .sub-title { color: #94a3b8; margin-top: 4px; font-size: 15px; }

        .action-area { display: flex; gap: 16px; align-items: center; }

        /* Time Filter Component */
        .time-filters { 
          background: #1e293b; 
          padding: 4px; 
          border-radius: 12px; 
          display: flex; 
          border: 1px solid rgba(255,255,255,0.05);
        }
        .filter-item { 
          padding: 6px 16px; border-radius: 8px; font-size: 13px; cursor: pointer; transition: 0.3s; color: #64748b; 
        }
        .filter-item.active { background: #334155; color: #38bdf8; font-weight: 600; }
        .filter-item:hover:not(.active) { color: #fff; }

        .refresh-btn {
          background: transparent !important; border: 1px solid #334155 !important; color: #fff !important;
          height: 40px; border-radius: 10px; font-weight: 500;
        }
        .refresh-btn:hover { border-color: #38bdf8 !important; color: #38bdf8 !important; }

        .stats-row { margin-bottom: 24px; }
        
        /* Glass Panels for Charts */
        .glass-panel {
          background: rgba(17, 25, 40, 0.6); /* */
          backdrop-filter: blur(12px);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          padding: 24px;
          height: 100%;
          transition: 0.3s;
        }
        .glass-panel:hover { border-color: rgba(255,255,255,0.1); }

        .spin-on-hover:hover { animation: spin 1s infinite linear; }
        @keyframes spin { 100% { transform: rotate(-360deg); } }

        @media (max-width: 768px) { .dashboard-wrapper { padding: 20px; } }
      `}} />
    </div>
  );
};

export default DashboardPage;