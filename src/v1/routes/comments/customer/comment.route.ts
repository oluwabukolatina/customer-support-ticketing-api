import { Router } from 'express';
import controller from '../../../controllers/comment/customer/comment.controller';

// middleware: only signed in user(admin/customer) can access this route
import auth from '../../../middlewares/auth';

const router = Router();

const { commentOnRequest } = controller;
router.post('/:id', auth, commentOnRequest);

export default router;
