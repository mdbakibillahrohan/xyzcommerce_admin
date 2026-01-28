/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tabs, Badge, theme, Space } from "antd";

interface ProductListTabsProps {
  activeTab: string;
  onChange: (key: string) => void;
}

const ProductListTabs = ({ activeTab, onChange }: ProductListTabsProps) => {
  const { token } = theme.useToken();

  // Mock data - এটি পরে ডায়নামিক করা যাবে
  const counts = {
    all: 120,
    archived: 12,
    published: 105,
    unpublished: 3,
  };

  const renderLabel = (label: string, count: number) => (
    <Space size={8}>
      <span style={{ fontWeight: 500 }}>{label}</span>
      <Badge
        count={count}
        showZero
        style={{
          backgroundColor: token.colorFillSecondary,
          color: token.colorTextTertiary,
          boxShadow: "none",
          fontSize: "11px",
          height: "18px",
          lineHeight: "18px",
          minWidth: "24px",
        }}
      />
    </Space>
  );

  return (
    <div
      style={{
        marginBottom: 16, 
        padding: "4px",
        background: token.colorFillQuaternary,
        borderRadius: 10,
        display: "inline-block",
      }}
    >
      <Tabs
        activeKey={activeTab} 
        onChange={onChange}   
        type="card"
        tabBarStyle={{
          marginBottom: 0,
          borderBottom: "none",
        }}
        items={[
          { 
            key: "all", 
            label: renderLabel("All products", counts.all) 
          },
          { 
            key: "published", 
            label: renderLabel("Published", counts.published) 
          },
          { 
            key: "unpublished", 
            label: renderLabel("Unpublished", counts.unpublished) 
          },
          { 
            key: "archived", 
            label: renderLabel("Archived", counts.archived) 
          },
        ]}
        style={{
          "--antd-wave-shadow-color": "transparent",
        } as any}
      />

      <style dangerouslySetInnerHTML={{ __html: `
        .ant-tabs-card .ant-tabs-tab {
          background: transparent !important;
          border: none !important;
          border-radius: 6px !important;
          margin-left: 0 !important;
          padding: 8px 16px !important;
          transition: all 0.2s ease;
        }
        .ant-tabs-card .ant-tabs-tab-active {
          background: #fff !important;
          box-shadow: 0 2px 4px rgba(0,0,0,0.05) !important;
        }
        .ant-tabs-nav::before {
          display: none !important;
        }
      `}} />
    </div>
  );
};

export default ProductListTabs;