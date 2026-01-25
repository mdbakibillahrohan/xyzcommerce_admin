import React from 'react';
import {
  Button,
  Dropdown,
  Input,
  message,
  Space,
  Avatar,
  Badge,
  type MenuProps,
} from 'antd';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  LogoutOutlined,
  UserOutlined,
  SettingOutlined,
  BellOutlined,
} from '@ant-design/icons';
import { Header } from 'antd/es/layout/layout';
import { useNavigate } from 'react-router';
import { logoutUser } from '../../../services/auth.service';

interface HeaderProps {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
  userData: { username?: string; avatarUrl?: string; email?: string } | null;
  isMobile?: boolean;           // ← pass from layout
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
      key: 'profile',
      icon: <UserOutlined />,
      label: 'Profile',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: 'Settings',
    },
    { type: 'divider' },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Log out',
      danger: true,
    },
  ];

  const onClick: MenuProps['onClick'] = ({ key }) => {
    if (key === 'logout') {
      try {
        const success = logoutUser();
        if (success) {
          message.success('Logged out successfully');
          navigate('/login', { replace: true });
        } else {
          throw new Error();
        }
      } catch {
        message.error('Logout failed');
      }
    }
    // → add profile / settings navigation later
  };

  const displayName =
    userData?.username ||
    userData?.email?.split('@')[0] ||
    'Admin';

  const avatarLetter = displayName[0]?.toUpperCase() ?? '?';

  return (
    <Header
      style={{
        padding: '0 16px 0 0',           // asymmetric – more space on right
        background: '#fff',
        borderBottom: '1px solid #f0f0f0',
        boxShadow: '0 1px 4px rgba(0,21,41,0.08)', // subtle modern shadow
        height: 64,
        lineHeight: '64px',
        zIndex: 10,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
          padding: '0 16px',
        }}
      >
        {/* Left – collapse toggle (hidden on mobile) */}
        {!isMobile && (
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{ fontSize: 18 }}
          />
        )}

        {/* Center – flexible search */}
        <div style={{ flex: 1, maxWidth: 560, margin: '0 24px' }}>
          <Input.Search
            placeholder="Search products, orders, customers…  /"
            allowClear
            enterButton={false}
            style={{ width: '100%' }}
            onSearch={(v) => {
              if (v.trim()) navigate(`/search?q=${encodeURIComponent(v)}`);
            }}
          />
        </div>

        {/* Right – actions */}
        <Space size={24} align="center">
          {/* Notifications (placeholder) */}
          <Badge count={3} size="small">
            <Button type="text" icon={<BellOutlined />} />
          </Badge>

          <Dropdown
            menu={{ items, onClick }}
            placement="bottomRight"
            arrow
            trigger={['click']}
          >
            <button
              type="button"
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}
            >
              <Avatar
                size={40}
                style={{ backgroundColor: '#1677ff' }}
                src={userData?.avatarUrl}
              >
                {!userData?.avatarUrl && avatarLetter}
              </Avatar>

              {!isMobile && (
                <span style={{ fontWeight: 500, color: '#1f2937' }}>
                  {displayName}
                </span>
              )}
            </button>
          </Dropdown>
        </Space>
      </div>
    </Header>
  );
};

export default HeaderComponent;