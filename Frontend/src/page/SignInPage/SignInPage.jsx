import { Form, Input, Button, Image } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slides/userSlice";
import { success, error } from "../../Components/Message/Message";
import {
  loginRequest,
  getDetailUserRequest,
  loginWithGoogle,
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

  const handleGoogleSignInSuccess = async (response) => {
    try {
      const tokenId = response.tokenId;
      const result = await loginWithGoogle(tokenId);
      if (result.message === "SUCCESS") {
        success("Đăng nhập thành công");
        // Handle storing access token and user data
        // Redirect or handle the signed-in user appropriately
      } else {
        error(result.message);
      }
    } catch (error) {
      error("Đã xảy ra lỗi trong quá trình đăng nhập");
    }
  };

  const handleGoogleSignInFailure = (error) => {
    console.error("Google Sign-In failed:", error);
  };

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
          <div style={{ display: "flex", justifyContent: "center" }}>
            {/* Google Sign-In button */}
            <GoogleLogin
              clientId="YOUR_CLIENT_ID"
              buttonText="Đăng nhập với Google"
              onSuccess={handleGoogleSignInSuccess}
              onFailure={handleGoogleSignInFailure}
              cookiePolicy={"single_host_origin"}
            />
          </div>
          <p style={{ fontSize: "1.2rem" }}>
            Chưa có tài khoản?{" "}
            <WrappperTextLight onClick={() => navigate("/sign-up")}>
              Đăng ký ngay
            </WrappperTextLight>
          </p>
        </WrapperContainerLeft>
        {/* <WrapperContainerRight style={{ borderRadius: '6px' }}>
                      <Image src={logoLogin} preview={false} alt="im`age-logo" height="100%" width="120%" />
                  </WrapperContainerRight> */}
      </div>
    </div>
  );
};

export default SignInPage;
