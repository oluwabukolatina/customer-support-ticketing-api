import express from 'express';
import controller from '../../../controllers/requests/customers/request.controller';
// middleware: only signed in users can access this route
import auth from '../../../middlewares/auth';

const router = express.Router();
const {
//   createRequest,
  // getARequest,
  getAUserRequests,
} = controller;
router.get('/', auth, controller.getAUserRequests);

// router.post('/', auth, createRequest);
// router.get('/:id', auth, getARequest);

export default router;
