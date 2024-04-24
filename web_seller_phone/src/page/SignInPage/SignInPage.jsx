import { Image } from 'antd';
import Button from '../../Components/Button';
import InputForm from '../../Components/InputForm/InputForm';
import { WrapperContainerLeft, WrapperContainerRight, WrappperTextLight } from './style';
import logoLogin from '../../assets/images/loginImg.jpg';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { loginRequest, getDetailUserRequest } from '../../apiService/apiService';
import { jwtDecode } from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/slides/userSlice';

function SignInPage() {
    const navigate = useNavigate();
    const handleNavigated = () => {
        navigate('/sign-up');
    };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    const handleToken = (result) => {
        if (result?.access_token) {
            try {
                const token = result?.access_token;
                const decoded = jwtDecode(token);
                console.log(decoded);
                if (decoded) {
                    const fetchApi = async () => {
                        try {
                            const resultUser = await getDetailUserRequest(decoded?.payload.userId, 
                                result?.access_token);
                            console.log(resultUser);
                            dispatch(setUser({ ...resultUser.data, access_token: token }));
                        } catch (e) {
                            alert('Error when login');
                        }
                    };

                    fetchApi();
                }
            } catch (decodeError) {
                console.error('Error decoding token:', decodeError);
            }
        } else {
            console.log('No access token received');
        }
    };
    const handleSignIn = () => {
        const fetchApi = async () => {
            try {
                const result = await loginRequest({
                    email,
                    password,
                });
                console.log(result);
                if (result.message === 'SUCCESS') {
                    alert('Login successful');
                    navigate('/');
                    localStorage.setItem('access_token', JSON.stringify(result?.access_token));
                    handleToken(result);
                } else {
                    alert('Login failed: ' + result.message);
                }
            } catch (e) {
                alert('Error when login');
            }
        };

        fetchApi();
    };
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
            <div style={{ width: '1000px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
                <WrapperContainerLeft>
                    <h1>Xin chào</h1>
                    <p style={{ marginBottom: '50px' }}>Đăng nhập vào tài khoản bằng email</p>
                    <InputForm onChange={setEmail} value={email} style={{ marginBottom: '10px' }} placeholder="Email" />
                    <InputForm onChange={setPassword} value={password} placeholder="password" />
                    <Button
                        onClick={handleSignIn}
                        disable={!email || !password ? true : false}
                        style={{ margin: '50px 0 10px' }}
                        primary
                    >
                        Đăng nhập
                    </Button>
                    <p style={{ fontSize: '1.2rem' }}>
                        Chưa có tài khoản ?{' '}
                        <WrappperTextLight onClick={handleNavigated}> Tạo tài khoản</WrappperTextLight>
                    </p>
                </WrapperContainerLeft>
                <WrapperContainerRight style={{ borderRadius: '6px' }}>
                    <Image src={logoLogin} preview={false} alt="iamge-logo" height="100%" width="100%" />
                </WrapperContainerRight>
            </div>
        </div>
    );
}

export default SignInPage;
