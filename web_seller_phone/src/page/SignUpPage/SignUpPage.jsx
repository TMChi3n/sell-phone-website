import InputForm from '../../Components/InputForm/InputForm';
import { WrapperContainerLeft, WrapperContainerRight, WrappperTextLight } from '../SignInPage/style';
import Button from '../../Components/Button';
import { Image } from 'antd';
import logoLogin from '../../assets/images/Login.png';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { registerRequest } from '../../apiService/apiService';

function SignUpPage() {
    const navigate = useNavigate();
    const handleNavigated = () => {
        navigate('/sign-in');
    };
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');

    const handleSignUp = () => {
        const fetchApi = async () => {
            try {
                const result = await registerRequest({
                    username,
                    email,
                    password,
                });
                console.log(result);
                if (result.message === 'SUCCESS') {
                    alert('Registration successful');
                    navigate('/sign-in');
                } else {
                    alert('Registration failed: ' + result.message);
                }
            } catch (e) {
                alert('Error when registering');
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
            <div style={{ width: '800px', height: '445px', borderRadius: '6px', background: '#fff', display: 'flex' }}>
                <WrapperContainerLeft>
                    <h1>Xin chào</h1>
                    <p style={{ marginBottom: '50px' }}>Đăng kí tài khoản </p>
                    <InputForm
                        onChange={setUserName}
                        value={username}
                        style={{ marginBottom: '10px' }}
                        placeholder="UserName"
                    />
                    <InputForm onChange={setEmail} value={email} style={{ marginBottom: '10px' }} placeholder="Email" />
                    <InputForm onChange={setPassword} value={password} placeholder="password" />

                    <Button
                        onClick={handleSignUp}
                        disable={!email || !password || !username ? true : false}
                        style={{ margin: '50px 0 10px' }}
                        primary
                    >
                        Đăng kí
                    </Button>

                    <p style={{ fontSize: '1.2rem' }}>
                        Bạn đã có tài khoản ?{' '}
                        <WrappperTextLight onClick={handleNavigated}> Đăng nhập </WrappperTextLight>
                    </p>
                </WrapperContainerLeft>
                <WrapperContainerRight style={{ borderRadius: '6px' }}>
                    <Image src={logoLogin} preview={false} alt="iamge-logo" height="203px" width="203px" />
                </WrapperContainerRight>
            </div>
        </div>
    );
}

export default SignUpPage;
