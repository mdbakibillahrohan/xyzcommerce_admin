
import { Input, Button, Space, Badge, Tooltip, theme } from "antd";
import { 
  FilterOutlined, 
  TableOutlined, 
  SearchOutlined, 
  SortAscendingOutlined,
  MoreOutlined,
  MacCommandOutlined
} from "@ant-design/icons";

const ProductListToolbar = () => {
  theme.useToken();

  return (
    <div className="quantum-toolbar">
      {/* Search Input Section */}
      <div className="search-wrapper">
        <Input
          prefix={<SearchOutlined className="search-icon-neon" />}
          suffix={
            <div className="kbd-group">
              <kbd className="cyber-kbd"><MacCommandOutlined style={{ fontSize: 10 }} /></kbd>
              <kbd className="cyber-kbd">K</kbd>
            </div>
          }
          placeholder="Quick search products, SKUs..."
          className="cyber-search-input"
        />
      </div>

      {/* Action Controls Section */}
      <Space size={16} className="toolbar-actions">
        <div className="button-glass-group">
          <Button 
            className="neon-action-btn" 
            icon={<SortAscendingOutlined />}
          >
            Sort
          </Button>
          
          <div className="divider-vertical" />
          
          <Button 
            className="neon-action-btn" 
            icon={<FilterOutlined />}
          >
            <Space size={4}>
              Filters
              <Badge 
                count={2} 
                className="filter-count-badge"
              />
            </Space>
          </Button>
        </div>

        <div className="utility-separator" />

        <Space size={10}>
          <Tooltip title="Configure Table Columns">
            <Button className="icon-only-glass" icon={<TableOutlined />}>
              <span className="btn-label-desktop">Columns</span>
            </Button>
          </Tooltip>
          
          <Button type="text" className="more-btn-cyber" icon={<MoreOutlined />} />
        </Space>
      </Space>

      <style dangerouslySetInnerHTML={{ __html: `
        .quantum-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 24px;
          background: rgba(15, 23, 42, 0.6);
          backdrop-filter: blur(15px);
          border-radius: 16px 16px 0 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
          gap: 20px;
        }

        /* Search Input Styling */
        .search-wrapper { flex: 1; maxWidth: 450px; }
        
        .cyber-search-input {
          background: rgba(0, 0, 0, 0.2) !important;
          border: 1px solid rgba(255, 255, 255, 0.08) !important;
          border-radius: 12px !important;
          padding: 8px 14px !important;
          transition: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .cyber-search-input:focus-within {
          border-color: #6366f1 !important;
          box-shadow: 0 0 15px rgba(99, 102, 241, 0.2) !important;
          background: rgba(0, 0, 0, 0.4) !important;
        }

        .search-icon-neon { color: #6366f1; filter: drop-shadow(0 0 5px #6366f1); }

        .kbd-group { display: flex; gap: 4px; align-items: center; }
        .cyber-kbd {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #64748b;
          border-radius: 4px;
          padding: 1px 6px;
          font-size: 10px;
          font-weight: 700;
          font-family: 'JetBrains Mono', monospace;
        }

        /* Grouped Buttons */
        .button-glass-group {
          display: flex;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 10px;
          padding: 2px;
        }

        .neon-action-btn {
          background: transparent !important;
          border: none !important;
          color: #94a3b8 !important;
          font-weight: 600 !important;
          height: 36px !important;
          transition: 0.3s !important;
        }

        .neon-action-btn:hover {
          color: #fff !important;
          background: rgba(255, 255, 255, 0.05) !important;
        }

        .divider-vertical {
          width: 1px;
          background: rgba(255, 255, 255, 0.08);
          margin: 6px 0;
        }

        /* Badge Styling */
        .filter-count-badge .ant-scroll-number {
          background: #6366f1 !important;
          box-shadow: 0 0 10px rgba(99, 102, 241, 0.5) !important;
          font-size: 10px !important;
          min-width: 16px;
          height: 16px;
          line-height: 16px;
        }

        /* Utility Buttons */
        .icon-only-glass {
          background: rgba(99, 102, 241, 0.05) !important;
          border: 1px solid rgba(99, 102, 241, 0.1) !important;
          color: #818cf8 !important;
          border-radius: 10px !important;
          height: 38px !important;
        }

        .icon-only-glass:hover {
          background: rgba(99, 102, 241, 0.15) !important;
          border-color: #6366f1 !important;
          transform: translateY(-2px);
        }

        .more-btn-cyber { color: #475569 !important; }
        .more-btn-cyber:hover { color: #fff !important; background: rgba(255,255,255,0.05) !important; }

        .utility-separator { width: 1px; height: 20px; background: rgba(255, 255, 255, 0.05); margin: 0 8px; }

        @media (max-width: 768px) {
          .btn-label-desktop { display: none; }
          .quantum-toolbar { padding: 12px; }
        }
      `}} />
    </div>
  );
};

export default ProductListToolbar;