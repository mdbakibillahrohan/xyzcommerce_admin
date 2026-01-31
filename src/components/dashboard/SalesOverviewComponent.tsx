/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Button, Card, Table, Typography, Space, Tooltip } from "antd";
import { 
  AreaChartOutlined, 
  ArrowUpOutlined, 
  InfoCircleOutlined,
  EyeOutlined,
  ThunderboltFilled 
} from '@ant-design/icons';

const { Text } = Typography;

const SalesOverviewComponent = () => {
    const dataSource: any = [
        { key: '1', date: '2024-01-01', sales: 150, revenue: 3000, customers: 120, productsSold: 200 },
        { key: '2', date: '2024-01-02', sales: 200, revenue: 4500, customers: 180, productsSold: 250 },
    ];

    const columns = [
        {
            title: 'DATE',
            dataIndex: 'date',
            key: 'date',
            render: (text: string) => <Text className="cyber-date">{text}</Text>,
        },
        {
            title: 'SALES',
            dataIndex: 'sales',
            key: 'sales',
            render: (val: number) => <Text className="data-val">{val}</Text>,
        },
        {
            title: 'REVENUE',
            dataIndex: 'revenue',
            key: 'revenue',
            render: (val: number) => (
                <Text className="revenue-val">
                    <span className="currency">$</span>{val.toLocaleString()}
                </Text>
            ),
        },
        {
            title: 'METRICS',
            key: 'metrics',
            render: (_: any, record: any) => (
                <Space size="middle">
                    <Tooltip title={`${record.customers} Customers`}>
                        <div className="mini-stat-badge purple">
                            <ThunderboltFilled /> {record.customers}
                        </div>
                    </Tooltip>
                    <Tooltip title={`${record.productsSold} Sold`}>
                        <div className="mini-stat-badge blue">
                             📦 {record.productsSold}
                        </div>
                    </Tooltip>
                </Space>
            ),
        },
    ];

    return (
        <div className="sales-container-glow">
            <Card 
                title={
                    <div className="sales-header">
                        <AreaChartOutlined className="header-icon-anim" />
                        <div className="header-text">
                            <span className="main-title">SALES OVERVIEW</span>
                            <span className="sub-title">Real-time Performance Metrics</span>
                        </div>
                    </div>
                }
                extra={
                    <Button type="link" className="view-all-btn" icon={<EyeOutlined />}>
                        VIEW ALL
                    </Button>
                }
                className="sales-cyber-card"
            >
                {/* Unique Addition: Quick Trend Bar */}
                <div className="quick-trend-banner">
                    <div className="trend-item">
                        <Text className="trend-label">NET REVENUE</Text>
                        <Text className="trend-value">$7,500 <ArrowUpOutlined className="up-icon" /></Text>
                    </div>
                    <div className="trend-divider" />
                    <div className="trend-item">
                        <Text className="trend-label">CONVERSION</Text>
                        <Text className="trend-value">12.5% <Text className="trend-tag">PRO</Text></Text>
                    </div>
                </div>

                <Table 
                    dataSource={dataSource} 
                    columns={columns} 
                    pagination={false} 
                    className="sales-cyber-table"
                />

                {/* Animated Footer */}
                <div className="sales-footer">
                    <div className="footer-left">
                        <div className="sync-pulse" />
                        <span className="sync-text">DATA SYNCHRONIZED</span>
                    </div>
                    <InfoCircleOutlined className="footer-info-icon" />
                </div>
            </Card>

            <style dangerouslySetInnerHTML={{ __html: `
                .sales-container-glow {
                    position: relative;
                    padding: 1px;
                    background: linear-gradient(145deg, rgba(99, 102, 241, 0.15), transparent 60%);
                    border-radius: 20px;
                }

                .sales-cyber-card {
                    background: rgba(13, 17, 23, 0.75) !important;
                    backdrop-filter: blur(25px);
                    border: 1px solid rgba(255, 255, 255, 0.05) !important;
                    border-radius: 20px !important;
                    box-shadow: 0 20px 50px rgba(0,0,0,0.3);
                }

                /* Header Styling */
                .sales-header { display: flex; align-items: center; gap: 15px; }
                .header-icon-anim { color: #6366f1; font-size: 22px; filter: drop-shadow(0 0 8px rgba(99, 102, 241, 0.6)); }
                .header-text { display: flex; flex-direction: column; }
                .main-title { color: #fff; font-size: 15px; font-weight: 800; letter-spacing: 1px; }
                .sub-title { color: #4b5563; font-size: 10px; font-weight: 600; text-transform: uppercase; }

                /* Quick Trend Bar */
                .quick-trend-banner {
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.03);
                    border-radius: 12px;
                    padding: 15px;
                    margin-bottom: 20px;
                    display: flex;
                    align-items: center;
                    gap: 30px;
                }
                .trend-item { display: flex; flex-direction: column; }
                .trend-label { color: #64748b; font-size: 10px; font-weight: 700; }
                .trend-value { color: #fff; font-size: 18px; font-weight: 800; font-family: 'JetBrains Mono', monospace; }
                .up-icon { color: #10b981; font-size: 14px; margin-left: 5px; }
                .trend-tag { font-size: 9px; background: #6366f1; color: #fff; padding: 1px 5px; border-radius: 4px; vertical-align: middle; }
                .trend-divider { width: 1px; height: 30px; background: rgba(255, 255, 255, 0.05); }

                /* Table Customization */
                .sales-cyber-table .ant-table { background: transparent !important; }
                .sales-cyber-table .ant-table-thead > tr > th {
                    background: transparent !important;
                    color: #4b5563 !important;
                    font-size: 10px;
                    font-weight: 800;
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05) !important;
                }
                .sales-cyber-table .ant-table-tbody > tr > td {
                    border-bottom: 1px solid rgba(255, 255, 255, 0.02) !important;
                    padding: 16px !important;
                }
                .sales-cyber-table .ant-table-tbody > tr:hover > td {
                    background: rgba(99, 102, 241, 0.03) !important;
                }

                /* Data Styling */
                .cyber-date { color: #94a3b8; font-family: 'JetBrains Mono', monospace; font-size: 13px; }
                .revenue-val { color: #10b981; font-weight: 800; font-size: 14px; }
                .currency { color: rgba(16, 185, 129, 0.5); margin-right: 2px; }
                
                .mini-stat-badge {
                    padding: 4px 10px;
                    border-radius: 8px;
                    font-size: 11px;
                    font-weight: 700;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }
                .mini-stat-badge.purple { background: rgba(168, 85, 247, 0.1); color: #a855f7; border: 1px solid rgba(168, 85, 247, 0.2); }
                .mini-stat-badge.blue { background: rgba(59, 130, 246, 0.1); color: #3b82f6; border: 1px solid rgba(59, 130, 246, 0.2); }

                /* Footer */
                .sales-footer {
                    margin-top: 15px;
                    padding-top: 15px;
                    border-top: 1px solid rgba(255, 255, 255, 0.05);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }
                .sync-pulse { width: 8px; height: 8px; background: #6366f1; border-radius: 50%; box-shadow: 0 0 10px #6366f1; animation: pulse 2s infinite; }
                .sync-text { color: #4b5563; font-size: 10px; font-weight: 800; letter-spacing: 1px; }
                .footer-info-icon { color: #4b5563; cursor: pointer; transition: 0.3s; }
                .footer-info-icon:hover { color: #6366f1; }

                @keyframes pulse { 0% { opacity: 0.5; transform: scale(0.8); } 50% { opacity: 1; transform: scale(1.2); } 100% { opacity: 0.5; transform: scale(0.8); } }
            `}} />
        </div>
    );
};

export default SalesOverviewComponent;