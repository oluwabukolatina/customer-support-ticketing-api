import express from 'express';
import controller from '../../../controllers/requests/admin/request.controller';

// middleware: only signed in admin can access this route
import admin from '../../../middlewares/admin/admin';

const router = express.Router();

const {
  getAllRequests, getARequest, attendToRequest, searchForClosedRequestsInOneMonth,
} = controller;
router.get('/', admin, getAllRequests);
router.get('/searchForClosed', admin, searchForClosedRequestsInOneMonth);
router.get('/:id', admin, getARequest);
router.put('/:id', admin, attendToRequest);

export default router;
