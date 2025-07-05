'use client';
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Form, Input, Button, Card, Typography  } from 'antd';
const { Link, Text } = Typography;

export default function Register() {
  const router = useRouter();
  const [form, setForm] = useState({name:'', email: '', password: '' });

  const handleSubmit = async () => {
    const res = await fetch('http://localhost:3001/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    console.log("register data: ",data);
    if (data.message=='User registered') {
      alert("User Registerd. Login to view Tasks page")
      // localStorage.setItem('token', data.access_token);
      router.push('/login');
    }
  };

  return (
    <Card title="Register" style={{ maxWidth: 400, margin: 'auto', marginTop: '50px' }}>
      <Form layout="vertical" >
        <Form.Item label="Username" name="username" onChange={e => setForm({ ...form, name: e.target.value })}  rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Email" name="email" onChange={e => setForm({ ...form, email: e.target.value })} rules={[{ type: 'email' },{required: true}]}>
          <Input />
        </Form.Item>
        <Form.Item label="Password" name="password" onChange={e => setForm({ ...form, password: e.target.value })} rules={[{ required: true }]}>
          <Input.Password />
        </Form.Item>
        <Form.Item>
          <Button type="primary" onClick={handleSubmit} htmlType="submit" block>
            Register
          </Button>
        </Form.Item>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Text>
            Already have account?{' '}
            <Link onClick={() => router.push('/login')}>
              Sign In
            </Link>
          </Text>
        </div>
      </Form>
    </Card>
      
  );
}
