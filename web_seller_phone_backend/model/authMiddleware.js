import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config(); // Đảm bảo rằng biến môi trường được nạp

const authMiddleware = (req, res, next) => {
  // Lấy token từ tiêu đề Authorization với định dạng "Bearer <token>"
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader) {
    return res.status(401).json({ message: 'Authorization header is missing' }); // Xử lý khi không có tiêu đề
  }

  const token = authorizationHeader.split(' ')[1]; // Lấy token từ phần thứ hai sau "Bearer"

  if (!token) {
    return res.status(401).json({ message: 'Token is missing' }); // Xử lý khi không có token
  }

  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN);
    req.id_user = decoded.payload.id_user;
    next(); 
  } catch (error) { 
    return res.status(401).json({ message: error.message || 'Invalid token' }); // Xử lý lỗi
  }
}

export default authMiddleware;
