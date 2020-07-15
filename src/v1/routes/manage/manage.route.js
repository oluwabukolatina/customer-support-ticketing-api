import { Router } from 'express';
import controller from '../../controllers/manage/manage.controller';
// middleware: only signed in superadmin can access this route
import superadmin from '../../middlewares/admin/superadmin';

const router = Router();

const {
  deleteRequest, getAllCustomers, getAllAdmins, upgradeAdminRole, getOneUser,

  deleteAdmin,
} = controller;
router.delete('/request/:id', superadmin, deleteRequest);
router.get('/customers', superadmin, getAllCustomers);
router.get('/admins', superadmin, getAllAdmins);
router.put('/admin/upgrade/:id', superadmin, upgradeAdminRole);
router.get('/user/:id', superadmin, getOneUser);
router.delete('/admin/:id', superadmin, deleteAdmin);
// router.delete('/admins', superadmin, deleteAdmin)

export default router;
