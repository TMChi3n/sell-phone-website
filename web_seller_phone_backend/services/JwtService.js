import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const generateAccessToken = (payload) => {
    return jwt.sign({ payload }, process.env.ACCESS_TOKEN, { expiresIn: '30m' });
};

const generateRefreshToken = (payload) => {
    return jwt.sign({ payload }, process.env.REFRESH_TOKEN, { expiresIn: '365d' });
};

export { generateAccessToken, generateRefreshToken };
