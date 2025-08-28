import express from "express";
import { get___ } from '../04-controllers/controller';

const router = express.Router();

router.get('/', get___)



export default router;