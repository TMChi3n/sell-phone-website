import InputForm from "../../Components/InputForm/InputForm";
import {
  WrapperContainerLeft,
  WrapperContainerRight,
  WrapperTextLight,
} from "../SignInPage/style";
import Button from "../../Components/Button";
import { Image } from "antd";
import logoLogin from "../../assets/images/Login.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { success, error } from "../../Components/Message/Message";
import { registerRequest } from "../../apiService/apiService";
import { useEffect } from "react";
import closeIcon from "../../assets/images/close.png";

function SignUpPage() {
  const navigate = useNavigate();
  const handleNavigated = () => {
    navigate("/sign-in");
  };
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUserName] = useState("");

  const handleSignUp = () => {
    const fetchApi = async () => {
      try {
        const result = await registerRequest({
          username,
          email,
          password,
        });
        console.log(result);
        success("Register successfull");
        if (result.message === "SUCCESS") {
          // alert('Đăng ký thành công');
          navigate("/sign-in");
        } else {
          alert("Registration failed: " + result.message);
        }
      } catch (e) {
        alert("Error when registering");
      }
    };

    fetchApi();
  };

  useEffect(() => {
    const handleOutsideClick = (e) => {
      const signUpForm = document.getElementById("sign-up-form");
      if (signUpForm && !signUpForm.contains(e.target)) {
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
        style={{
          width: "800px",
          height: "445px",
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
        <WrapperContainerLeft id="sign-up-form">
          <h1 style={{ marginBottom: "30px" }}>Welcome!</h1>
          <InputForm
            onChange={setUserName}
            value={username}
            style={{ marginBottom: "10px" }}
            placeholder="UserName"
          />
          <InputForm
            onChange={setEmail}
            value={email}
            style={{ marginBottom: "10px" }}
            placeholder="Email"
          />
          <InputForm
            onChange={setPassword}
            type="password"
            value={password}
            placeholder="Password"
          />

          <Button
            onClick={handleSignUp}
            disable={!email || !password || !username ? true : false}
            style={{ margin: "30px 0 10px" }}
            primary
          >
            Sign Up
          </Button>

          <p style={{ fontSize: "1.5rem", fontFamily: "Times New Roman" }}>
            Have an account ?{" "}
            <WrapperTextLight onClick={handleNavigated}>
              {" "}
              Sign In{" "}
            </WrapperTextLight>
          </p>
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
}

export default SignUpPage;
