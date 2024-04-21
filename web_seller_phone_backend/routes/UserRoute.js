import express from 'express';
<<<<<<< HEAD
import { createUser, loginUser, getAllUser } from '../controller/UserController.js';
=======
import {
    createUser,getDetailsUser,loginUser
} from '../controller/UserController.js';
>>>>>>> Viet

const router = express.Router();
router.post('/post/user', (req, res) => createUser(req, res));
router.post('/post/login', (req, res) => loginUser(req, res));
<<<<<<< HEAD
router.get('/get/users', (req, res) => getAllUser(req, res));
=======
router.get('/getDetailUser/:id_user',(req, res)=>getDetailsUser(req, res));
>>>>>>> Viet
export default router;
