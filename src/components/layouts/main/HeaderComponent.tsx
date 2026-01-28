/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import {
  Button,
  Dropdown,
  Input,
  message,
  Space,
  Avatar,
  Badge,
  Tooltip,
  type MenuProps,
} from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  UserOutlined,
  SettingOutlined,
  BellOutlined,
  SearchOutlined,
  ThunderboltFilled,
  GlobalOutlined,
} from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';
import { useNavigate } from 'react-router';
import { logoutUser } from '../../../services/auth.service';

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  userData: { username?: string; avatarUrl?: string; email?: string } | null;
  isMobile?: boolean;
}

const HeaderComponent: React.FC<HeaderProps> = ({
  collapsed,
  setCollapsed,
  userData,
  isMobile = false,
}) => {
  const navigate = useNavigate();

  const items: MenuProps['items'] = [
    {
      key: 'user-info',
      label: (
        <div className="dropdown-user-info">
          <p className="user-name">{userData?.username || 'Admin User'}</p>
          <p className="user-email">{userData?.email || 'admin@astra.com'}</p>
        </div>
      ),
      disabled: true,
    },
    { type: 'divider' },
    { key: 'profile', icon: <UserOutlined />, label: 'My Profile' },
    { key: 'settings', icon: <SettingOutlined />, label: 'Account Settings' },
    { 
      key: 'logout', 
      icon: <LogoutOutlined />, 
      label: 'Sign Out', 
      danger: true 
    },
  ];

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      const success = logoutUser();
      if (success) {
        message.success('Successfully signed out');
        navigate('/login', { replace: true });
      }
    }
  };

  const displayName = userData?.username || userData?.email?.split('@')[0] || 'Admin';
  const avatarLetter = displayName[0]?.toUpperCase() ?? '?';

  return (
    <Header className="cyber-header">
      {/* Left Section */}
      <Space size="large" style={{ flex: 1 }}>
        <div className="collapse-trigger" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
          <div className="trigger-glow" />
        </div>
        
        {!isMobile && (
          <div className="search-container-v3">
            <div className="search-bg-glow" />
            <Input
              placeholder="Search assets, users, or logs..."
              prefix={<SearchOutlined className="cyber-search-icon" />}
              suffix={<div className="search-kbd">⌘K</div>}
              variant="borderless"
              className="intelligent-search-input"
            />
            <div className="search-active-bar" />
          </div>
        )}
      </Space>

      {/* Right Section */}
      <Space size={20}>
        {!isMobile && (
          <Space size={4}>
            <Tooltip title="Switch Store">
              <Button type="text" icon={<GlobalOutlined />} className="header-action-btn" />
            </Tooltip>
            <Tooltip title="System Healthy">
              <Button type="text" icon={<ThunderboltFilled />} className="header-action-btn status-icon" />
            </Tooltip>
            <Badge count={3} size="small" className="cyber-badge" offset={[-5, 5]}>
              <Button type="text" icon={<BellOutlined />} className="header-action-btn" />
            </Badge>
          </Space>
        )}

        <Dropdown
          menu={{ items, onClick }}
          placement="bottomRight"
          trigger={['click']}
          overlayClassName="cyber-dropdown-overlay"
        >
          <div className="user-profile-pill">
            <div className="avatar-wrapper">
              <Avatar
                size={36}
                src={userData?.avatarUrl}
                className="actual-avatar"
              >
                {!userData?.avatarUrl && avatarLetter}
              </Avatar>
              <div className="online-indicator">
                <div className="dot" />
                <div className="ping" />
              </div>
            </div>

            {!isMobile && (
              <div className="user-info-text">
                <span className="user-name-label">{displayName}</span>
                <span className="user-role-label">Administrator</span>
              </div>
            )}
          </div>
        </Dropdown>
      </Space>

      <style dangerouslySetInnerHTML={{ __html: `
        .cyber-header {
          padding: 0 32px;
          background: rgba(10, 14, 22, 0.85) !important;
          backdrop-filter: blur(20px) saturate(180%);
          border-bottom: 1px solid rgba(255, 255, 255, 0.08);
          height: 75px !important;
          display: flex;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 1000;
        }

        /* --- UNIQUE SEARCH SECTION V3 --- */
        .search-container-v3 {
          position: relative;
          width: 320px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 0 12px;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          display: flex;
          align-items: center;
        }

        .search-container-v3:hover {
          background: rgba(255, 255, 255, 0.07);
          border-color: rgba(99, 102, 241, 0.4);
        }

        .search-container-v3:focus-within {
          width: 440px;
          background: rgba(13, 17, 23, 0.95);
          border-color: #6366f1;
          box-shadow: 0 0 25px rgba(99, 102, 241, 0.3);
        }

        .search-bg-glow {
          position: absolute;
          inset: 0;
          border-radius: 12px;
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.1), transparent);
          opacity: 0;
          transition: 0.4s;
        }
        .search-container-v3:focus-within .search-bg-glow { opacity: 1; }

        .intelligent-search-input {
          height: 42px;
          color: #fff !important;
          font-size: 14px;
          z-index: 2;
        }
        .intelligent-search-input::placeholder { color: #64748b !important; }

        .cyber-search-icon { color: #64748b; transition: 0.3s; font-size: 17px; }
        .search-container-v3:focus-within .cyber-search-icon { color: #6366f1; transform: scale(1.1); }

        .search-kbd {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #94a3b8;
          padding: 2px 6px;
          border-radius: 4px;
          font-size: 10px;
          font-weight: 700;
        }

        .search-active-bar {
          position: absolute;
          bottom: -1px;
          left: 10%;
          width: 0%;
          height: 2px;
          background: linear-gradient(90deg, #6366f1, #a855f7);
          transition: 0.5s ease;
          border-radius: 10px;
        }
        .search-container-v3:focus-within .search-active-bar { width: 80%; }

        /* --- BUTTONS & PROFILE --- */
        .collapse-trigger {
          width: 40px; height: 40px; border-radius: 10px;
          background: rgba(255,255,255,0.03); display: flex; align-items: center; justify-content: center;
          color: #94a3b8; cursor: pointer; transition: 0.3s;
        }
        .collapse-trigger:hover { color: #6366f1; background: rgba(99, 102, 241, 0.1); }

        .header-action-btn {
          width: 40px; height: 40px; color: #64748b !important;
          display: flex; align-items: center; justify-content: center; font-size: 18px;
        }
        .header-action-btn:hover { color: #fff !important; background: rgba(255,255,255,0.06) !important; }

        .user-profile-pill {
          display: flex; align-items: center; gap: 12px;
          padding: 5px 15px 5px 5px; border-radius: 30px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          cursor: pointer; transition: 0.3s;
        }
        .user-profile-pill:hover { border-color: #6366f1; background: rgba(99, 102, 241, 0.08); }

        .actual-avatar { border: 2px solid #6366f1 !important; background: #fff !important; color: #6366f1 !important; font-weight: 700; }
        
        .online-indicator { position: absolute; bottom: 0; right: 0; width: 10px; height: 10px; }
        .dot { width: 100%; height: 100%; background: #22c55e; border-radius: 50%; border: 2px solid #0d1117; }
        .ping { position: absolute; inset: 0; background: #22c55e; border-radius: 50%; animation: ping 1.5s infinite; z-index: -1; }
        @keyframes ping { 75%, 100% { transform: scale(2.5); opacity: 0; } }

        .user-info-text { display: flex; flex-direction: column; line-height: 1.2; }
        .user-name-label { color: #fff; font-size: 13px; font-weight: 700; }
        .user-role-label { color: #64748b; font-size: 10px; text-transform: uppercase; letter-spacing: 0.5px; }

        .cyber-dropdown-overlay .ant-dropdown-menu {
          background: rgba(13, 17, 23, 0.95) !important;
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          border-radius: 14px !important;
        }
        .dropdown-user-info { padding: 10px 15px; }
        .user-name { color: #fff; font-weight: 700; margin: 0; }
        .user-email { color: #64748b; font-size: 11px; margin: 0; }
      `}} />
    </Header>
  );
};

export default HeaderComponent;