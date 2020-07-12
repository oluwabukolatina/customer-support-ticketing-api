const express = require('express');

const router = express.Router();
const controller = require('../../controllers/manage/manage.controller');
// middleware: only signed in superadmin can access this route
const superadmin = require('../../middlewares/admin/superadmin');

const {
  deleteRequest, getAllCustomers, getAllAdmins, upgradeAdminRole, getOneUser,
} = controller;
router.delete('/request/:id', superadmin, deleteRequest);
router.get('/customers', superadmin, getAllCustomers);
router.get('/admins', superadmin, getAllAdmins);
router.put('/admin/upgrade/:id', superadmin, upgradeAdminRole);
router.get('/user/:id', superadmin, getOneUser);

// router.delete('/admin/:id', superadmin, deleteAdmin)
// router.delete('/admins', superadmin, deleteAdmin)

module.exports = router;
