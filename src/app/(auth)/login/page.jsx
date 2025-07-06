'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Form, Input, Button, Card, Typography } from 'antd';

const { Link, Text } = Typography;

export default function Login() {
  const router = useRouter();
  const [form, setForm] = useState({ email: '', password: '' });

  const handleLogin = async () => {
    const res = await fetch('http://localhost:3001/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    console.log("login data: ",data);
    if (data.access_token) {
      localStorage.setItem('token', data.access_token);
      router.push('/tasks');
    }else{
      alert(data.message || 'Wrong email or password');
    }
  };

  return (
    <Card title="Login" style={{ maxWidth: 400, margin: 'auto', marginTop: '50px' }}>
      <Form layout="vertical">
        <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email' }]}>
          <Input
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
          />
        </Form.Item>

        <Form.Item label="Password" name="password" rules={[{ required: true }]}>
          <Input.Password
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={handleLogin} htmlType="submit" block>
            Login
          </Button>
        </Form.Item>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Link onClick={() => router.push('/forgot-password')}>
            Forgot Password?
          </Link>
          <Text>
            Haven't signed up?{' '}
            <Link onClick={() => router.push('/register')}>
              Sign Up
            </Link>
          </Text>
        </div>
      </Form>
    </Card>
  );
}
