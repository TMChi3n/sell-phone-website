import { CreateUser } from '../services/User/CreateUserService.js';
import { LoginUser } from '../services/User/LoginService.js';
<<<<<<< HEAD
import { ListUsers } from '../services/User/ListUser.js';
=======
import { GetDetailsUser } from '../services/User/GetDetailsUser.js';
>>>>>>> Viet

const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const isCheckEmail = reg.test(email);
        if (!username || !email || !password) {
<<<<<<< HEAD
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required',
=======
            return res.status(400).json({
                status: 'ERR',
                message: 'All input fields are required.'
>>>>>>> Viet
            });
        } else if (!isCheckEmail) {
            return res.status(400).json({
                status: 'ERR',
<<<<<<< HEAD
                message: 'The input is email',
            });
        }
        const response = await CreateUser(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message,
=======
                message: 'Invalid email format.'
            });
        } 
        const response = await CreateUser(req.body);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e.message
>>>>>>> Viet
        });
    }
};

const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const reg = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const isCheckEmail = reg.test(email);
        if (!email || !password) {
<<<<<<< HEAD
            return res.status(200).json({
                status: 'ERR',
                message: 'The input is required',
=======
            return res.status(400).json({
                status: 'ERR',
                message: 'Email and password are required',
>>>>>>> Viet
            });
        } else if (!isCheckEmail) {
            return res.status(400).json({
                status: 'ERR',
<<<<<<< HEAD
                message: 'The input is email',
=======
                message: 'Invalid email format',
>>>>>>> Viet
            });
        }
        const response = await LoginUser(req.body);
        return res.status(200).json(response);
    } catch (e) {
<<<<<<< HEAD
        return res.status(404).json({
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

export { createUser, loginUser, getAllUser };
=======
        return res.status(500).json({
            status: 'ERR',
            message: e.message
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
export {createUser, loginUser, getDetailsUser}
>>>>>>> Viet
