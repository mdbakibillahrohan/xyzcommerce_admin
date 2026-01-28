import React from "react";
import { 
  ArrowUpOutlined, 
  MoreOutlined, 
  ThunderboltFilled 
} from "@ant-design/icons";
import { Tooltip } from "antd";

interface StatCardProps {
  title?: string;
  value?: string | number;
  icon?: React.ReactNode;
  color: string; // Base theme color (e.g., #4F46E5)
  trend?: string;
}

const DashboardStatCard = ({
  title = "Total Revenue",
  value = "BDT 0",
  icon = <ThunderboltFilled />,
  color = "#4F46E5",
  trend = "+0.0%"
}: StatCardProps) => {
  return (
    <div className="cyber-container">
      <div className="cyber-glass-card">
        {/* Animated Background Flow */}
        <div className="bg-flow" style={{ background: `linear-gradient(45deg, ${color}20, transparent, ${color}20)` }} />
        
        {/* Dynamic Glowing Border */}
        <div className="edge-glow" style={{ background: color }} />

        <div className="inner-content">
          <div className="top-section">
            <div className="icon-sphere" style={{ boxShadow: `0 0 20px ${color}60` }}>
               <div className="icon-glow" style={{ background: color }} />
               <span className="actual-icon" style={{ color: color }}>{icon}</span>
            </div>
            <Tooltip title="View Stats">
              <MoreOutlined className="options-icon" />
            </Tooltip>
          </div>

          <div className="middle-section">
            <span className="stat-label">{title}</span>
            <h2 className="stat-value">
              {value}
              <span className="cursor-blink" style={{ background: color }}></span>
            </h2>
          </div>

          <div className="bottom-section">
            <div className="trend-chip" style={{ background: `${color}15`, border: `1px solid ${color}30` }}>
              <ArrowUpOutlined style={{ color: color }} />
              <span style={{ color: color }}>{trend}</span>
            </div>
            <span className="time-text">vs yesterday</span>
          </div>

          {/* Animated Energy Bar */}
          <div className="energy-meter">
            <div className="energy-fill" style={{ 
              background: `linear-gradient(90deg, transparent, ${color}, transparent)`,
              boxShadow: `0 0 10px ${color}`
            }} />
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .cyber-container {
          position: relative;
          width: 100%;
          min-height: 200px;
          transition: transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }

        .cyber-glass-card {
          background: rgba(17, 25, 40, 0.85); /* Industrial Dark */
          backdrop-filter: blur(16px) saturate(180%);
          border-radius: 24px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 24px;
          overflow: hidden;
          position: relative;
          height: 100%;
        }

        .bg-flow {
          position: absolute;
          inset: 0;
          opacity: 0.3;
          animation: meshFlow 8s ease infinite;
        }

        @keyframes meshFlow {
          0%, 100% { transform: scale(1) translate(0, 0); }
          50% { transform: scale(1.2) translate(10%, 10%); }
        }

        .edge-glow {
          position: absolute;
          width: 40%; height: 2px;
          top: 0; left: -50%;
          opacity: 0.6;
          filter: blur(4px);
          animation: sweep 3s linear infinite;
        }

        @keyframes sweep {
          0% { left: -100%; }
          100% { left: 200%; }
        }

        .inner-content { position: relative; z-index: 5; }

        .top-section {
          display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;
        }

        .icon-sphere {
          width: 48px; height: 48px; border-radius: 50%;
          background: rgba(0,0,0,0.4); display: flex; align-items: center; justify-content: center;
          position: relative; overflow: hidden;
        }

        .icon-glow {
          position: absolute; width: 100%; height: 100%; opacity: 0.15;
          filter: blur(8px); animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { transform: scale(0.8); opacity: 0.1; }
          50% { transform: scale(1.2); opacity: 0.3; }
          100% { transform: scale(0.8); opacity: 0.1; }
        }

        .stat-label {
          color: #94a3b8; font-size: 13px; font-weight: 600; 
          text-transform: uppercase; letter-spacing: 1.5px;
        }

        .stat-value {
          color: #fff; font-size: 28px; font-weight: 800; margin: 8px 0;
          display: flex; align-items: center; gap: 8px;
        }

        .cursor-blink {
          width: 3px; height: 24px; border-radius: 2px;
          animation: blink 0.8s step-end infinite;
        }

        @keyframes blink { 50% { opacity: 0; } }

        .bottom-section { display: flex; align-items: center; gap: 12px; margin-top: 16px; }

        .trend-chip {
          padding: 4px 10px; border-radius: 12px; font-size: 12px; 
          font-weight: 700; display: flex; align-items: center; gap: 4px;
        }

        .time-text { color: #475569; font-size: 12px; }

        .energy-meter {
          width: 100%; height: 2px; background: rgba(255,255,255,0.05);
          margin-top: 24px; border-radius: 4px; overflow: hidden;
        }

        .energy-fill {
          width: 100%; height: 100%;
          animation: load 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes load {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        .cyber-container:hover {
          transform: translateY(-10px) scale(1.02);
        }
      `}} />
    </div>
  );
};

export default DashboardStatCard;