/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Card, Table } from "antd";

const SalesOverviewComponent = () => {

    const dataSource:any = [
        {
            key: '1',
            date: '2024-01-01',
            sales: 150,
            revenue: 3000,
            customers: 120,
            productsSold: 200,
        },
        {
            key: '2',
            date: '2024-01-02',
            sales: 200,
            revenue: 4500,
            customers: 180,
            productsSold: 250,
        },
    ];

    const columns = [
        {
            title: 'Date',
            dataIndex: 'date',
            key: 'date',
        },
        {
            title: 'Sales',
            dataIndex: 'sales',
            key: 'sales',
        },
        {
            title: 'Revenue',
            dataIndex: 'revenue',
            key: 'revenue',
        },
        {
            title: 'Customers',
            dataIndex: 'customers',
            key: 'customers',
        },
        {
            title: 'Products Sold',
            dataIndex: 'productsSold',
            key: 'productsSold',
        }

    ];

  return <Card title="Sales Overview" extra={<Button type="text">View All</Button>}><Table dataSource={dataSource} columns={columns} pagination={false} /></Card>;
};

export default SalesOverviewComponent;