import { Card, Table } from "antd";

const OrderStatusComponent = () => {

    const columns = [
        {
            title: 'Order ID',
            dataIndex: 'orderId',
            key: 'orderId',
        },
        {
            title: 'Customer',
            dataIndex: 'customer',
            key: 'customer',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status',
        },
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
    ];

    const dataSource = [
        {
            key: '1',
            orderId: 'ORD12345',
            customer: 'John Doe',
            status: 'Shipped',
            date: '2024-01-01',
        },
        {
            key: '2',
            orderId: 'ORD12346',
            customer: 'Jane Smith',
            status: 'Processing',
            date: '2024-01-02',
        },
    ];
  return <Card title="Order Status"><Table columns={columns} dataSource={dataSource} pagination={false} /></Card>;
};

export default OrderStatusComponent;