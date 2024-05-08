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
import logoLogin from "../../assets/images/Login.png";
import google_icon from "../../assets/images/google-icon.png";
import closeIcon from "../../assets/images/close.png";
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
      error("The username and/or password you specified are not correct.");
    }
  };

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
          height: "400px",
          borderRadius: "6px",
          background: "#fff",
          display: "flex",
          position: "relative",
        }}
      >
        <img
          src={closeIcon}
          alt="Close"
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            cursor: "pointer",
            width: "20px",
            zIndex: "1", // Ensure close button is above other content
          }}
          onClick={() => navigate("/")} // Add functionality to close the sign-in form
        />
        <WrapperContainerLeft>
          <h1 style={{ marginBottom: "20px", textAlign: "center" }}>
            Welcome!
          </h1>
          <Form
            onFinish={handleSignIn}
            style={{ display: "flex", flexDirection: "column", gap: "5px" }}
          >
            <Form.Item
              name="email"
              rules={[
                {
                  required: true,
                  message: "Required",
                },
              ]}
            >
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "Required" }]}
            >
              <Input.Password placeholder="Mật khẩu" />
            </Form.Item>

            <Button
              type="primary"
              htmlType="submit"
              style={{
                backgroundColor: "red",
                borderColor: "red",
              }}
            >
              Sign In
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

          <WrappperTextLight onClick={() => navigate("/sign-up")}>
            Sign Up
          </WrappperTextLight>
        </WrapperContainerLeft>
        <WrapperContainerRight style={{ borderRadius: "6px" }}>
          <Image
            src={logoLogin}
            preview={false}
            alt="iamge-logo"
            height="203px"
            width="203px"
          />
        </WrapperContainerRight>
      </div>
    </div>
  );
};

export default SignInPage;
