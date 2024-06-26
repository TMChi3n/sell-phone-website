import { CreateUser } from "../services/User/createUserService.js";
import { LoginUser } from "../services/User/loginService.js";
import { ListUsers } from "../services/User/listUser.js";
import { GetDetailsUser } from "../services/User/getDetailsUser.js";
import {
  generateAccessToken,
  refreshTokenJwtService,
} from "../services/jwtService.js";
import passportGoogleOAuth from "passport-google-oauth20";
import dotenv from "dotenv";
import { sendMail } from "../services/sendMail.js";
import passport from "passport";

dotenv.config();
const { Strategy: GoogleStrategy } = passportGoogleOAuth;

const createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!username || !email || !password) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(400).json({
        status: "ERR",
        message: "The input is email",
      });
    }
    const response = await CreateUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e.message,
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    const isCheckEmail = reg.test(email);
    if (!email || !password) {
      return res.status(200).json({
        status: "ERR",
        message: "The input is required",
      });
    } else if (!isCheckEmail) {
      return res.status(400).json({
        status: "ERR",
        message: "The input is email",
      });
    }
    const response = await LoginUser(req.body);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e.message,
    });
  }
};

const getDetailsUser = async (req, res) => {
  try {
    const id_user = req.params.id_user;
    const response = await GetDetailsUser(id_user);
    if (response.status === "ERR") {
      return res.status(404).json({
        status: "ERR",
        message: "User not found",
      });
    }
    return res.status(200).json(response); // Thành công
  } catch (e) {
    return res.status(500).json({
      status: "ERR",
      message: e.message,
    });
  }
};

const getAllUser = async (req, res) => {
  try {
    const response = await ListUsers();
    res.status(200).json(response);
  } catch (e) {
    res.status(500).json({
      status: "error",
      message: "User not found",
    });
  }
};

const refreshToken = async (req, res) => {
  try {
    if (!req.headers.authorization) {
      return res.status(200).json({
        status: "ERR",
        message: "The token is required",
      });
    }
    let authorization = req.headers.authorization.split(" ")[1];
    if (!authorization) {
      return res.status(200).json({
        status: "ERR",
        message: "The token is required",
      });
    }
    const response = await refreshTokenJwtService(authorization);
    return res.status(200).json(response);
  } catch (e) {
    return res.status(404).json({
      message: e.message,
    });
  }
};

// const loginAccountWithGoogle = async (req, res) => {
//   try {
//     const { token } = req.body;
//     const googleUser = await verify(token);
//     if (googleUser) {
//       const payload = { id_user: googleUser.sub, ...googleUser };
//       const accessToken = await generateAccessToken(payload);
//       const refreshToken = await refreshTokenJwtService(payload);
//       res.json({
//         accessToken,
//         refreshToken,
//         user: payload,
//       });
//     } else {
//       res.status(403).json({ message: "Invalid Google token" });
//     }
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

export { createUser, loginUser, getAllUser, getDetailsUser, refreshToken };
