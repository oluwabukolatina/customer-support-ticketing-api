import express from 'express';
import controller from '../../../controllers/requests/customers/request.controller';
// middleware: only signed in users can access this route
import auth from '../../../middlewares/auth';

const router = express.Router();
const { createRequest, getARequest, getAUserRequests } = controller;
router.post('/', auth, createRequest);
router.get('/', auth, getAUserRequests);
router.get('/:id', auth, getARequest);

export default router;
