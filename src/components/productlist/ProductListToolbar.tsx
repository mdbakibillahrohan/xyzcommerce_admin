import { Input, Button, Space, Badge, Tooltip, theme } from "antd";
import { 
  FilterOutlined, 
  TableOutlined, 
  SearchOutlined, 
  SortAscendingOutlined,
  MoreOutlined 
} from "@ant-design/icons";

const ProductListToolbar = () => {
  const { token } = theme.useToken();

  // Custom Industrial KBD style
  const kbdStyle: React.CSSProperties = {
    padding: '2px 6px',
    fontSize: '10px',
    fontWeight: 600,
    fontFamily: 'sans-serif',
    borderRadius: '4px',
    background: token.colorFillSecondary,
    border: `1px solid ${token.colorBorder}`,
    color: token.colorTextSecondary,
    boxShadow: `0 1px 0 ${token.colorBorder}`,
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '12px 16px',
      background: token.colorBgContainer,
      border: `1px solid ${token.colorBorderSecondary}`,
      borderRadius: '12px 12px 0 0',
      borderBottom: 'none',
    }}>
      {/* Search Section */}
      <div style={{ flex: 1, maxWidth: 400 }}>
        <Input
          prefix={<SearchOutlined style={{ color: token.colorTextTertiary }} />}
          suffix={
            <Space size={4}>
              <kbd style={kbdStyle}>Ctrl</kbd>
              <kbd style={kbdStyle}>K</kbd>
            </Space>
          }
          placeholder="Search products, SKUs, or vendors..."
          variant="filled"
          style={{ 
            borderRadius: 8,
            backgroundColor: token.colorFillQuaternary,
            border: 'none'
          }}
        />
      </div>

      {/* Action Section */}
      <Space size={12}>
        <Space.Compact>
          <Button icon={<SortAscendingOutlined />}>Sort</Button>
          <Button icon={<FilterOutlined />}>
            Filters 
            <Badge 
              count={2} 
              size="small" 
              style={{ backgroundColor: token.colorPrimary, marginLeft: 6, fontSize: '10px' }} 
            />
          </Button>
        </Space.Compact>

        <div style={{ width: 1, height: 24, background: token.colorBorderSecondary, margin: '0 4px' }} />

        <Space size={8}>
          <Tooltip title="View Settings">
            <Button icon={<TableOutlined />}>Columns</Button>
          </Tooltip>
          
          <Button type="text" shape="circle" icon={<MoreOutlined />} />
        </Space>
      </Space>
    </div>
  );
};

export default ProductListToolbar;