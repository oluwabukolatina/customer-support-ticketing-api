import { Router } from 'express';
import controller from '../../controllers/auth/auth.controller';

const router = Router();
const { loginUser } = controller;
router.post('/login', loginUser);
// router.post('/register', registerUser);
export default router;
