import { Router } from 'express';
import controller from '../../controllers/auth/auth.controller';

const router = Router();
router.post('/login', controller.loginUser);
router.post('/register', controller.registerUser);
export default router;
