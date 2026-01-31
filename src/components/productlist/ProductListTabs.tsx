
import { Tabs, Badge, theme, Space } from "antd";

interface ProductListTabsProps {
  activeTab: string;
  onChange: (key: string) => void;
}

const ProductListTabs = ({ activeTab, onChange }: ProductListTabsProps) => {
  theme.useToken();

  const counts = {
    all: 120,
    archived: 12,
    published: 105,
    unpublished: 3,
  };

  const renderLabel = (label: string, count: number, key: string) => (
    <Space size={12} className={`custom-tab-item ${activeTab === key ? 'is-active' : ''}`}>
      <span className="tab-text">{label}</span>
      <Badge
        count={count}
        showZero
        className="cyber-count-badge"
      />
    </Space>
  );

  return (
    <div className="tabs-outer-shell">
      <Tabs
        activeKey={activeTab} 
        onChange={onChange}   
        animated={{ inkBar: true, tabPane: false }}
        className="cyber-tabs-navigation"
        items={[
          { key: "all", label: renderLabel("All Products", counts.all, "all") },
          { key: "published", label: renderLabel("Published", counts.published, "published") },
          { key: "unpublished", label: renderLabel("Unpublished", counts.unpublished, "unpublished") },
          { key: "archived", label: renderLabel("Archived", counts.archived, "archived") },
        ]}
      />

      <style dangerouslySetInnerHTML={{ __html: `
        /* Shell Styling */
        .tabs-outer-shell {
          background: rgba(15, 23, 42, 0.4);
          padding: 6px;
          border-radius: 16px;
          display: inline-block;
          border: 1px solid rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
          margin-bottom: 24px;
        }

        /* Basic Tab Removal */
        .cyber-tabs-navigation .ant-tabs-nav::before { display: none !important; }
        .cyber-tabs-navigation .ant-tabs-nav { margin-bottom: 0 !important; }

        /* Custom Label Styling */
        .custom-tab-item {
          padding: 6px 16px;
          transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
          position: relative;
          z-index: 2;
        }

        .tab-text {
          color: #94a3b8;
          font-weight: 600;
          font-size: 13px;
          letter-spacing: 0.3px;
        }

        .is-active .tab-text {
          color: #fff !important;
          text-shadow: 0 0 10px rgba(99, 102, 241, 0.4);
        }

        /* Badge Styling */
        .cyber-count-badge .ant-scroll-number {
          background: rgba(255, 255, 255, 0.05) !important;
          color: #64748b !important;
          box-shadow: none !important;
          border: 1px solid rgba(255, 255, 255, 0.1) !important;
          font-family: 'JetBrains Mono', monospace;
          font-size: 10px !important;
        }

        .is-active .cyber-count-badge .ant-scroll-number {
          background: #6366f1 !important;
          color: #fff !important;
          border-color: #818cf8 !important;
          box-shadow: 0 0 12px rgba(99, 102, 241, 0.4) !important;
        }

        /* Sliding Active Ink Bar */
        .cyber-tabs-navigation .ant-tabs-ink-bar {
          height: 100% !important;
          background: rgba(99, 102, 241, 0.15) !important;
          border: 1px solid rgba(99, 102, 241, 0.3);
          border-radius: 12px !important;
          z-index: 1;
          box-shadow: inset 0 0 15px rgba(99, 102, 241, 0.1);
        }

        /* Hover Interaction */
        .ant-tabs-tab:hover .tab-text {
          color: #cbd5e1;
        }

        /* Slide & Fade Animation */
        .ant-tabs-tab {
          margin: 0 4px !important;
          padding: 0 !important;
        }
      `}} />
    </div>
  );
};

export default ProductListTabs;