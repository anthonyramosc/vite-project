import React, { useState } from 'react';
import { Form, Input, Button, Card, message, Checkbox } from 'antd';
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
            background: 'linear-gradient(135deg, #452c63 0%, #6b4288 100%)',
            backgroundImage: `
                linear-gradient(135deg, #452c63 0%, #6b4288 100%),
                url('https://p4.wallpaperbetter.com/wallpaper/958/136/1009/valley-mountains-trees-digital-art-artwork-hd-wallpaper-preview.jpg')
            `,
            backgroundBlendMode: 'overlay',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '150vh',
        }}>
            <Card
                style={{
                    width: 400,
                    background: 'rgba(181,138,204,0.8)',
                    borderRadius: '16px',
                    borderColor: 'white',
                    boxShadow: '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
                    backdropFilter: 'blur(4px)',
                }}
            >
                <h1 style={{
                    textAlign: 'center',
                    marginBottom: 32,
                    color: '#ffffff',
                    fontSize: '28px',
                    fontWeight: 'bold'
                }}>
                    Login
                </h1>

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
                            prefix={<UserOutlined style={{ color: 'rgba(255, 255, 255, 0.8)' }}/>}
                            placeholder="Email"
                            size="large"
                            style={{
                                background: 'transparent',
                                border: 'none',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: 0,
                                color: '#ffffff',
                            }}
                        />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Por favor ingresa tu contraseña' }]}
                    >
                        <Input.Password
                            prefix={<LockOutlined style={{ color: 'rgba(255, 255, 255, 0.8)' }}/>}
                            placeholder="Password"
                            size="large"
                            style={{
                                background: 'transparent',
                                border: 'none',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.3)',
                                borderRadius: 0,
                                color: '#ffffff',
                            }}
                        />
                    </Form.Item>

                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '20px',
                        color: '#ffffff'
                    }}>
                        <Form.Item name="remember" valuePropName="checked" noStyle>
                            <Checkbox style={{ color: '#ffffff' }}>Remember Me</Checkbox>
                        </Form.Item>
                        <a style={{ color: '#ffffff' }}>Forget Password</a>
                    </div>

                    <Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            size="large"
                            block
                            loading={loading}
                            style={{
                                marginTop: 24,
                                height: '45px',
                                backgroundColor: '#ffffff',
                                color: '#452c63',
                                borderRadius: '25px',
                                border: 'none',
                                fontWeight: '600',
                            }}
                        >
                            Log in
                        </Button>
                    </Form.Item>


                </Form>
            </Card>
        </div>
    );
};

export default Login;