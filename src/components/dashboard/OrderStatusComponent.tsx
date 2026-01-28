/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { Card, Table, Tag, Typography } from "antd";
import { 
  ShoppingOutlined, 
  ClockCircleOutlined, 
  CheckCircleOutlined, 
  SyncOutlined 
} from '@ant-design/icons';

const { Text } = Typography;

const OrderStatusComponent = () => {
    // Enhanced Status Badges
    const renderStatus = (status: string) => {
        const isShipped = status === 'Shipped';
        const color = isShipped ? '#10b981' : '#f59e0b';
        const icon = isShipped ? <CheckCircleOutlined /> : <ClockCircleOutlined />;
        const bg = isShipped ? 'rgba(16, 185, 129, 0.1)' : 'rgba(245, 158, 11, 0.1)';

        return (
            <Tag icon={icon} className="cyber-status-tag" style={{ color, backgroundColor: bg, borderColor: `${color}44` }}>
                {status}
            </Tag>
        );
    };

    const columns = [
        {
            title: 'ORDER ID',
            dataIndex: 'orderId',
            key: 'orderId',
            width: '25%', 
            render: (text: string) => <Text className="order-id-link">{text}</Text>,
        },
        {
            title: 'CUSTOMER',
            dataIndex: 'customer',
            key: 'customer',
            width: '35%',
            render: (text: string) => <Text className="customer-name">{text}</Text>,
        },
        {
            title: 'STATUS',
            dataIndex: 'status',
            key: 'status',
            width: '20%',
            render: (status: string) => renderStatus(status),
        },
        {
            title: 'DATE',
            dataIndex: 'date',
            key: 'date',
            width: '20%',
            render: (text: string) => <Text className="date-text">{text}</Text>,
        },
    ];

    const dataSource = [
        { key: '1', orderId: 'ORD12345', customer: 'John Doe', status: 'Shipped', date: '2024-01-01' },
        { key: '2', orderId: 'ORD12346', customer: 'Jane Smith', status: 'Processing', date: '2024-01-02' },
        { key: '3', orderId: 'ORD12347', customer: 'Robert Fox', status: 'Processing', date: '2024-01-03' },
    ];

    return (
        <Card 
            title={
                <div className="card-header-flex">
                    <ShoppingOutlined className="header-icon" />
                    <span>RECENT TRANSACTIONS</span>
                </div>
            }
            className="order-status-card"
        >
            <Table 
                columns={columns} 
                dataSource={dataSource} 
                pagination={false} 
                className="custom-cyber-table"
            />
            
            <div className="live-feed-footer">
                <span className="footer-label">LIVE SYSTEM FEED</span>
                <div className="status-dot-pulse" />
            </div>

            <style dangerouslySetInnerHTML={{ __html: `
                /* Card Base */
                .order-status-card {
                    background: rgba(13, 17, 23, 0.7) !important;
                    backdrop-filter: blur(20px);
                    border: 1px solid rgba(255, 255, 255, 0.05) !important;
                    border-radius: 20px !important;
                    overflow: hidden;
                }

                .card-header-flex { display: flex; align-items: center; gap: 12px; color: #fff; font-weight: 700; letter-spacing: 1px; font-size: 14px; }
                .header-icon { color: #6366f1; font-size: 18px; }

                /* Table Alignment & Visibility */
                .custom-cyber-table .ant-table { background: transparent !important; }
                
                .custom-cyber-table .ant-table-thead > tr > th {
                    background: rgba(255, 255, 255, 0.02) !important;
                    color: #64748b !important;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
                    font-size: 11px;
                    font-weight: 800;
                    text-transform: uppercase;
                }

                .custom-cyber-table .ant-table-tbody > tr > td {
                    border-bottom: 1px solid rgba(255, 255, 255, 0.02) !important;
                    padding: 18px 16px !important;
                    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                }

                /* Hover Effect: Electric Blue Glow */
                .custom-cyber-table .ant-table-tbody > tr:hover > td {
                    background: rgba(99, 102, 241, 0.06) !important;
                    cursor: pointer;
                }
                
                .custom-cyber-table .ant-table-tbody > tr:hover .order-id-link {
                    color: #fff !important;
                    text-shadow: 0 0 10px #6366f1;
                }

                /* Typography */
                .order-id-link { color: #6366f1 !important; font-weight: 700; font-family: 'JetBrains Mono', monospace; transition: 0.3s; }
                .customer-name { color: #e2e8f0; font-weight: 500; }
                .date-text { color: #475569; font-size: 12px; }

                /* Footer Pulse */
                .live-feed-footer { padding: 15px 16px; display: flex; align-items: center; gap: 8px; border-top: 1px solid rgba(255,255,255,0.03); }
                .footer-label { font-size: 10px; color: #475569; font-weight: 800; letter-spacing: 2px; }
                .status-dot-pulse { width: 6px; height: 6px; background: #22c55e; border-radius: 50%; box-shadow: 0 0 8px #22c55e; animation: pulse 1.5s infinite; }
                
                @keyframes pulse { 0% { opacity: 0.4; } 50% { opacity: 1; } 100% { opacity: 0.4; } }

                .cyber-status-tag { border-radius: 6px; font-weight: 700; font-size: 10px; border: 1px solid transparent; }
            `}} />
        </Card>
    );
};

export default OrderStatusComponent;