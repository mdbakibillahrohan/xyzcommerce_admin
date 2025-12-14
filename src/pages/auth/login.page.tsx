/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { Button, Card, Form, Input, message, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { loginService, storeAuthToken } from '../../services/auth.service';
import { useNavigate } from 'react-router';


const { Title, Text } = Typography;

export default function LoginPage() {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = async(values: any) => {
    const startLoginMessage = message.loading("Login.......")
    try{
        const res = await loginService(values);
        if(res.status==200){
            storeAuthToken(res?.data?.access_token);
            navigate("/dashboard");
        }
    }catch(err: any){
       message.error(err?.response?.data?.message);
    }finally{
        startLoginMessage()
    }
    
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center px-4 py-12">
      <Card
        className="w-full max-w-md shadow-2xl border-0 rounded-2xl overflow-hidden"
        bodyStyle={{ padding: '48px 40px' }}
      >
        {/* Logo / Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-blue-600 to-purple-600 rounded-2xl mb-4">
            <LockOutlined className="text-2xl text-white" />
          </div>
          <Title level={2} className="mt-4 mb-2 text-gray-800">
            Welcome Back
          </Title>
          <Text type="secondary" className="text-base">
            Sign in to continue to your account
          </Text>
        </div>

        <Form
          form={form}
          name="login"
          layout="vertical"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
          size="large"
        >
          <Form.Item
            name="usernameOrEmail"
            label="Email Or Username"
            rules={[
              { required: true, message: 'Please enter your email or username' }
            ]}
          >
            <Input
              prefix={<UserOutlined className="text-gray-400" />}
              placeholder="you@example.com"
              className="rounded-lg h-12 px-4"
            />
          </Form.Item>

          <Form.Item
            name="password"
            label="Password"
            rules={[
              { required: true, message: 'Please enter your password' },
              { min: 6, message: 'Password must be at least 6 characters' },
            ]}
          >
            <Input.Password
              prefix={<LockOutlined className="text-gray-400" />}
              placeholder="••••••••"
              className="rounded-lg h-12 px-4"
            />
          </Form.Item>

          <div className="flex items-center justify-between mb-6">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <label className="flex items-center cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500" />
                <span className="ml-2 text-sm text-gray-600">Remember me</span>
              </label>
            </Form.Item>
            <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              Forgot password?
            </a>
          </div>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              block
              size="large"
              className="h-12 text-base font-semibold bg-linear-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Sign In
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
}