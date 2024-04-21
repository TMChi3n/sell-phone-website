import User from '../../model/UserModel.js';
import bcrypt from 'bcryptjs';
import { generateAccessToken, generateRefreshToken } from "../JwtService.js";

const LoginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin;
        try {
            const checkUser = await User.findOne({ email: email });
            if (checkUser === null) {
                resolve({ 
                    status: 'ERR',
                    message: 'The user is not defined'
                });
                return;
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password);
            if (!comparePassword) {
                resolve({ 
                    status: 'ERR',
                    message: 'The password or user is incorrect'
                });
                return;
            }
            const access_token = await generateAccessToken({
                id_user: checkUser.id_user,
                isAdmin: checkUser.isAdmin
            });
            const refresh_token = await generateRefreshToken({
                id_user: checkUser.id_user,
                isAdmin: checkUser.isAdmin
            });
            resolve({ // Correct spelling of resolve
                status: 'OK',
                message: 'SUCCESS',
                access_token,
                refresh_token
            });
        } catch (e) {
            reject(e);
        }
    });
};

export { LoginUser };
