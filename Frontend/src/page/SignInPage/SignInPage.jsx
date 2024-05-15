import { Form, Input, Button, Image } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slides/userSlice';
import { success, error } from '../../Components/Message/Message';
import { loginRequest, getDetailUserRequest } from '../../apiService/apiService';
import { jwtDecode } from 'jwt-decode';
import logoLogin from '../../assets/images/loginImg.jpg';
import { WrapperContainerLeft, WrapperContainerRight, WrappperTextLight } from './style';
import { useEffect } from 'react';

const SignInPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // const handleSignIn = async (values) => {
    //     try {
    //         const result = await loginRequest(values);
    //         if (result.message === 'SUCCESS') {
    //             success('Đăng nhập thành công');
    //             localStorage.setItem('access_token', result.access_token);
    //             localStorage.setItem('refresh_token', result.refresh_token);

    //             const decoded = jwtDecode(result.access_token);
    //             const resultUser = await getDetailUserRequest(decoded?.payload.userId, result.access_token);

    //             dispatch(setUser({ ...resultUser.data, access_token: result.access_token }));
    //             navigate('/');
    //         } else {
    //             error(result.message);
    //         }
    //     } catch (e) {
    //         error('Đã xảy ra lỗi trong quá trình đăng nhập');
    //     }
    // };
    const handleToken = async (token) => {
        try {
            const decoded = jwtDecode(token);
            if (decoded && decoded.payload && decoded.payload.userId) {
                const userId = decoded.payload.userId;
                const resultUser = await getDetailUserRequest(userId, token);
                dispatch(setUser({ ...resultUser.data, access_token: token }));
                navigate('/');
                success('Đăng nhập thành công')
    
            } else {
                throw new Error('Invalid token payload');
            }
        } catch (error) {
            console.error('Error handling token:', error);
            alert('An error occurred during token handling. Please try again later.');
        }
    };
    
    
    const handleSignIn = async (values) => {
        try {
            const result = await loginRequest(values);
    
            if (result.message === 'SUCCESS' && result.access_token) {
    
                localStorage.setItem('access_token', JSON.stringify(result.access_token));
                handleToken(result.access_token);
            } else {
                alert('Login failed: ' + result.message);
            }
        } catch (error) {
            console.error('Error during login:', error);
            alert('An error occurred during login. Please try again later.');
        }
    };

    useEffect(() => {
        const handleOutsideClick = (e) => {
            const signInForm = document.getElementById('sign-in-form');
            if (signInForm && !signInForm.contains(e.target)) {
                navigate('/');
            }
        };

        document.addEventListener('mousedown', handleOutsideClick);

        return () => {
            document.removeEventListener('mousedown', handleOutsideClick);
        };
    }, [navigate]);

    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(0, 0, 0, 0.53)',
                height: '100vh',
            }}
        >
            <div
                id="sign-in-form"
                style={{
                    width: '1000px',
                    height: '445px',
                    borderRadius: '6px',
                    background: '#fff',
                    display: 'flex',
                }}
            >
                <WrapperContainerLeft>
                    <h1>Xin chào</h1>
                    <p style={{ marginBottom: '50px' }}>Đăng nhập vào tài khoản bằng email</p>
                    <Form onFinish={handleSignIn} style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                        <Form.Item name="email" rules={[{ required: true, message: 'Vui lòng nhập email' }]}>
                            <Input placeholder="Email" />
                        </Form.Item>
                        <Form.Item name="password" rules={[{ required: true, message: 'Vui lòng nhập mật khẩu' }]}>
                            <Input.Password placeholder="Mật khẩu" />
                        </Form.Item>
                        <Button
                            type="primary"
                            htmlType="submit"
                            style={{ backgroundColor: 'red', borderColor: 'red', margin: '50px 0 10px' }}
                        >
                            Đăng nhập
                        </Button>
                    </Form>
                    <p style={{ fontSize: '1.2rem' }}>
                        Chưa có tài khoản?{' '}
                        <WrappperTextLight onClick={() => navigate('/sign-up')}>Đăng ký ngay</WrappperTextLight>
                    </p>
                </WrapperContainerLeft>
                <WrapperContainerRight style={{ borderRadius: '6px' }}>
                    <Image src={logoLogin} preview={false} alt="image-logo" height="100%" width="120%" />
                </WrapperContainerRight>
            </div>
        </div>
    );
};

export default SignInPage;




