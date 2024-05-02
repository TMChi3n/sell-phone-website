import { CreateUser } from '../services/User/CreateUserService.js';
import { LoginUser } from '../services/User/LoginService.js';
import { ListUsers } from '../services/User/ListUser.js';
import { GetDetailsUser } from '../services/User/GetDetailsUser.js';
import { refreshTokenJwtService } from '../services/JwtService.js';
import logout from '../services/User/LogoutService.js';
const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const isCheckEmail = reg.test(email);
        if (!username || !email || !password) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required',
            });
        } else if (!isCheckEmail) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The input is email',
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
                status: 'ERR',
                message: 'The input is required',
            });
        } else if (!isCheckEmail) {
            return res.status(400).json({
                status: 'ERR',
                message: 'The input is email',
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
        if (response.status === 'ERR') {
            return res.status(404).json({
                status: 'ERR',
                message: 'User not found',
            });
        }
        return res.status(200).json(response); // Thành công
    } catch (e) {
        return res.status(500).json({
            status: 'ERR',
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
            status: 'error',
            message: 'User not found',
        });
    }
};

const refreshToken = async (req, res) => {
    try {
        if (!req.headers.authorization) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The token is required',
            });
        }
        let authorization = req.headers.authorization.split(' ')[1];
        if (!authorization) {
            return res.status(200).json({
                status: 'ERR',
                message: 'The token is required',
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

const logoutUser = async (req, res) => {
    try {
        // Call the logout service function (corrected function name)
        const result = await logout(req.accessToken); // Assuming req.accessToken contains the access token

        // Clear the token cookie on the client side
        res.clearCookie('accessToken');

        // Send response
        res.status(200).json(result);
    } catch (error) {
        console.error('Logout failed:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export { createUser, loginUser, getAllUser, getDetailsUser, refreshToken, logoutUser };
