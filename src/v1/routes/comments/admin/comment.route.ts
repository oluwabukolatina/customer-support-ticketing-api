import { Router } from 'express';

import controller from '../../../controllers/comment/admin/comment.controller';
// middleware: only signed in user(admin/customer) can access this route
import admin from '../../../middlewares/admin/admin';

const router = Router();

const { commentOnRequest } = controller;
router.post('/:id', admin, commentOnRequest);

export default router;
