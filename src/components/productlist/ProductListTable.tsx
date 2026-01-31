/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Table, Switch, Button, Space, Avatar, message, Tag, Tooltip, Modal } from "antd";
import { EditOutlined, DeleteOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { deleteProduct,updateProduct } from "../../services/product.service"; 

const { confirm } = Modal;

interface ProductListTableProps {
  dataSource: any[];
  loading: boolean;
  refreshData: () => void;
}

const ProductListTable = ({ dataSource, loading, refreshData }: ProductListTableProps) => {
  const navigate = useNavigate();

  // 1 delet action confirm modal function
  const showDeleteConfirm = (record: any) => {
    confirm({
      title: 'Are you sure you want to delete this product?',
      icon: <ExclamationCircleOutlined style={{ color: '#ef4444' }} />,
      content: `This action will permanently remove "${record.product_name}" from your inventory.`,
      okText: 'Yes, Delete',
      okType: 'danger',
      cancelText: 'No, Keep it',
      centered: true,
      className: "cyber-modal-custom",
      async onOk() {
        try {
        
          await deleteProduct(record.product_id); 
          message.success("Product successfully removed from vault");
          if (refreshData) refreshData();
        } catch (error: any) {
          message.error(error.response?.data?.message || "Purge sequence failed");
        }
      },
    });
  };


  const handleEdit = (productId: string) => {
  
    navigate(`/products/edit/${productId}`);
  };

  const columns = [
    {
      title: "PRODUCT IDENTITY",
      dataIndex: "product_name",
      key: "product_name",
      width: '30%',
      render: (_: any, record: any) => {
        const imageUrl = record.image_path
          ? `http://localhost:3005/${record.image_path}`
          : "https://via.placeholder.com/48";

        return (
          <div className="product-identity-cell">
            <div className="avatar-wrapper">
              <Avatar shape="square" size={54} src={imageUrl} className="cyber-avatar" />
              {record.stocks > 0 ? <div className="status-dot-online" /> : <div className="status-dot-offline" />}
            </div>
            <div className="product-details">
              <span className="product-title-text">{record.product_name}</span>
              <div className="meta-tags">
                <Tag color="blue" className="mini-tag">{record.category_name || 'GENERIC'}</Tag>
                <span className="sku-label">SKU: {record.sku || 'N/A'}</span>
              </div>
            </div>
          </div>
        );
      },
    },
    {
      title: "INVENTORY & VENDOR",
      key: "inventory",
      render: (_: any, record: any) => (
        <div className="inventory-info">
          <span className="vendor-name-text">{record.vendor_name || "Direct Source"}</span>
          <div className="stock-visualizer">
            <div className="stock-bar-bg">
              <div 
                className={`stock-bar-fill ${record.stocks < 10 ? 'critical' : 'healthy'}`} 
                style={{ width: `${Math.min(record.stocks, 100)}%` }} 
              />
            </div>
            <span className="stock-count-text">{record.stocks} units available</span>
          </div>
        </div>
      )
    },
    {
      title: "UNIT PRICE",
      dataIndex: "price",
      key: "price",
      render: (value: any) => (
        <div className="price-container">
          <span className="currency-symbol">৳</span>
          <span className="price-value">{Number(value).toLocaleString()}</span>
        </div>
      ),
    },
    {
      title: "AVAILABILITY",
      key: "publish_toggle",
      align: 'center' as const,
      render: (_: any, record: any) => (
        <Tooltip title={String(record.status) === 'published' ? 'Active in Store' : 'Hidden'}>
           <Switch 
             className="neon-switch"
             checked={String(record.status) === 'published'} 
             size="small"
           />
        </Tooltip>
      ),
    },
    {
      title: "OPERATIONS",
      key: "actions",
      align: 'right' as const,
      render: (_: any, record: any) => (
        <Space size="middle" className="action-button-group">
          
          <Button 
            className="glass-action-btn edit" 
            icon={<EditOutlined />} 
            onClick={() => handleEdit(record.product_id)}
          />
        
          <Button 
            className="glass-action-btn delete" 
            icon={<DeleteOutlined />} 
            danger 
            onClick={() => showDeleteConfirm(record)}
          />
        </Space>
      ),
    },
  ];

  return (
    <div className="cyber-table-container">
      <Table
        columns={columns}
        dataSource={dataSource}
        loading={loading}
        pagination={{ 
          pageSize: 7,
          className: "cyber-pagination-ui",
          showTotal: (total) => `TOTAL ASSETS: ${total}`
        }}
        rowKey="product_id"
        className="neon-industrial-table"
      />

      <style dangerouslySetInnerHTML={{ __html: `
        .neon-industrial-table { background: rgba(13, 17, 23, 0.6) !important; backdrop-filter: blur(10px); border: 1px solid rgba(255, 255, 255, 0.05); border-radius: 20px; overflow: hidden; }
        .neon-industrial-table .ant-table { background: transparent !important; color: #f1f5f9 !important; }
        .neon-industrial-table .ant-table-thead > tr > th { background: rgba(255, 255, 255, 0.02) !important; color: #94a3b8 !important; font-size: 11px; font-weight: 800; border-bottom: 2px solid rgba(99, 102, 241, 0.3) !important; padding: 20px 24px !important; text-transform: uppercase; }
        .neon-industrial-table .ant-table-tbody > tr > td { border-bottom: 1px solid rgba(255, 255, 255, 0.03) !important; padding: 16px 24px !important; }
        .neon-industrial-table .ant-table-row:hover > td { background: rgba(99, 102, 241, 0.1) !important; box-shadow: inset 4px 0 0 #6366f1; }
        .product-identity-cell { display: flex; align-items: center; gap: 15px; }
        .avatar-wrapper { position: relative; border: 1px solid rgba(255, 255, 255, 0.1); border-radius: 12px; padding: 4px; background: rgba(0,0,0,0.2); }
        .status-dot-online { position: absolute; top: -2px; right: -2px; width: 12px; height: 12px; background: #10b981; border: 2px solid #0d1117; border-radius: 50%; box-shadow: 0 0 10px #10b981; }
        .status-dot-offline { position: absolute; top: -2px; right: -2px; width: 12px; height: 12px; background: #ef4444; border: 2px solid #0d1117; border-radius: 50%; }
        .product-title-text { color: #fff; font-size: 15px; font-weight: 700; display: block; }
        .sku-label { font-family: 'JetBrains Mono', monospace; color: #64748b; font-size: 10px; }
        .stock-bar-bg { width: 100px; height: 6px; background: rgba(255, 255, 255, 0.05); border-radius: 10px; margin: 8px 0; overflow: hidden; }
        .stock-bar-fill { height: 100%; transition: width 1.5s cubic-bezier(0.4, 0, 0.2, 1); }
        .stock-bar-fill.healthy { background: linear-gradient(90deg, #6366f1, #a855f7); }
        .stock-bar-fill.critical { background: #f59e0b; }
        .stock-count-text { font-size: 10px; color: #64748b; font-weight: 600; }
        .price-container { background: rgba(99, 102, 241, 0.1); padding: 6px 14px; border-radius: 10px; border: 1px solid rgba(99, 102, 241, 0.2); }
        .price-value { color: #fff; font-weight: 800; font-size: 16px; font-family: 'JetBrains Mono', monospace; }
        .cyber-modal-custom .ant-modal-content { background: #111827 !important; border: 1px solid rgba(255, 255, 255, 0.1) !important; border-radius: 20px !important; }
        .cyber-modal-custom .ant-modal-confirm-title { color: #fff !important; font-size: 18px !important; }
        .cyber-modal-custom .ant-modal-confirm-content { color: #9ca3af !important; }
        .glass-action-btn { background: rgba(255, 255, 255, 0.03) !important; border: 1px solid rgba(255, 255, 255, 0.08) !important; color: #94a3b8 !important; border-radius: 10px !important; }
        .glass-action-btn:hover.edit { color: #6366f1 !important; border-color: #6366f1 !important; background: rgba(99, 102, 241, 0.1) !important; }
        .glass-action-btn:hover.delete { color: #ef4444 !important; border-color: #ef4444 !important; background: rgba(239, 68, 68, 0.1) !important; }
      `}} />
    </div>
  );
};

export default ProductListTable;