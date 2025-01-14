import React, { useState } from 'react';
import { Form, Input, Button, Card, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { authApi } from '../api/auth';
import type { LoginCredentials } from '../types/auth';

const Login: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const onFinish = async (values: LoginCredentials) => {
        try {
            setLoading(true);
            const response = await authApi.login(values);

            localStorage.setItem('token', response.token);

            message.success('Login exitoso!');
            navigate('/dashboard');
        } catch (error) {
            message.error(error instanceof Error ? error.message : 'Error al iniciar sesión');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '100vh',
            background: '#f0f2f5'
        }}>
            <Card style={{ width: 400 }}>
                <h1 style={{ textAlign: 'center', marginBottom: 24 }}>Iniciar Sesión</h1>
                <Form<LoginCredentials>
                    name="login"
                    onFinish={onFinish}
                    layout="vertical"
                >
                    <Form.Item
                        name="email"
                        rules={[
                            { required: true, message: 'Por favor ingresa tu email' },
                            { type: 'email', message: 'Ingresa un email válido' }
                        ]}
                    >
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Email"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined />}
                            placeholder="Contraseña"
                            size="large"
                        />
                    </Form.Item>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            block
                            loading={loading}
                        >
                            Iniciar Sesión
                        </Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    );
};

export default Login;