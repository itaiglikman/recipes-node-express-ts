import express from "express";
import { getProfile, login, register } from "../04-controllers/authController";
import { verifyToken } from "../03-middlewares/verifyToken";

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

router.get('/profile', verifyToken, getProfile);



export default router;