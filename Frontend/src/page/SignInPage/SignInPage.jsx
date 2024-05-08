import { Form, Input, Button, Image } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slides/userSlice";
import { success, error } from "../../Components/Message/Message";
import {
  loginRequest,
  getDetailUserRequest,
} from "../../apiService/apiService";
import { jwtDecode } from "jwt-decode";
import logoLogin from "../../assets/images/loginImg.jpg";
import google_icon from "../../assets/images/google-icon.png";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrappperTextLight,
} from "./style";
import { useEffect, useState } from "react";
import { GoogleLogin } from "react-google-login";

const SignInPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // const handleGoogleLogin = async (res) => {
  //   try {
  //     const result = await loginWithGoogle(res.tokenId);
  //     if (result && result.message === "SUCCESS") {
  //       success("Login successful");
  //       localStorage.setItem("access_token", result.access_token);
  //       localStorage.setItem("refresh_token", result.refresh_token);

  //       const decoded = jwtDecode(result.access_token);
  //       const resultUser = await getDetailUserRequest(
  //         decoded?.payload.userId,
  //         result.access_token
  //       );

  //       dispatch(
  //         setUser({ ...setUser.data, access_token: result.access_token })
  //       );
  //       navigate("/");
  //     } else {
  //       error(result.message || "Login failed with Google");
  //     }
  //   } catch (error) {
  //     error("Login failed");
  //   }
  // };

  // const handleGoogleLoginFailure = async (res) => {
  //   error("Cannot login with Google! Please try again");
  // };

  const handleSignIn = async (values) => {
    try {
      const result = await loginRequest(values);
      if (result.message === "SUCCESS") {
        success("Đăng nhập thành công");
        localStorage.setItem("access_token", result.access_token);
        localStorage.setItem("refresh_token", result.refresh_token);

        const decoded = jwtDecode(result.access_token);
        const resultUser = await getDetailUserRequest(
          decoded?.payload.userId,
          result.access_token
        );

        dispatch(
          setUser({ ...resultUser.data, access_token: result.access_token })
        );
        navigate("/");
      } else {
        error(result.message);
      }
    } catch (e) {
      error("Đã xảy ra lỗi trong quá trình đăng nhập");
    }
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      const signInForm = document.getElementById("sign-in-form");
      if (signInForm && !signInForm.contains(e.target)) {
        navigate("/");
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [navigate]);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "rgba(0, 0, 0, 0.53)",
        height: "100vh",
      }}
    >
      <div
        id="sign-in-form"
        style={{
          width: "800px",
          height: "445px",
          borderRadius: "6px",
          background: "#fff",
          display: "flex",
        }}
      >
        <WrapperContainerLeft>
          <h1>Xin chào</h1>
          <p style={{ marginBottom: "50px" }}>
            Đăng nhập vào tài khoản bằng email
          </p>
          <Form
            onFinish={handleSignIn}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <Form.Item
              name="email"
              rules={[{ required: true, message: "Vui lòng nhập email" }]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
            >
              <Input.Password placeholder="Mật khẩu" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "red",
                borderColor: "red",
                margin: "10px 0 10px",
              }}
            >
              Đăng nhập
            </Button>
          </Form>
          {/* <GoogleLogin
            clientId="YOUR_GOOGLE_CLIENT_ID" // Replace with your actual Google Client ID
            buttonText="Đăng nhập với Google"
            onSuccess={handleGoogleLogin}
            onFailure={handleGoogleLoginFailure}
            cookiePolicy={"single_host_origin"}
            style={{ margin: "10px 0" }}
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <img src={google_icon} alt="Google sign-in" />
                Đăng nhập với Google
              </button>
            )}
          /> */}
          <p style={{ fontSize: "1.2rem" }}>
            Chưa có tài khoản?{" "}
            <WrappperTextLight onClick={() => navigate("/sign-up")}>
              Đăng ký ngay
            </WrappperTextLight>
          </p>
        </WrapperContainerLeft>
        <WrapperContainerRight style={{ borderRadius: "6px" }}>
          <Image
            src={logoLogin}
            preview={false}
            alt="im`age-logo"
            height="100%"
            width="120%"
          />
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignInPage;
