"use strict";
var express = require('express');
var router = express.Router();
var controller = require('../../controllers/manage/manage.controller');
// middleware: only signed in superadmin can access this route
var superadmin = require('../../middlewares/admin/superadmin');
var deleteRequest = controller.deleteRequest, getAllCustomers = controller.getAllCustomers, getAllAdmins = controller.getAllAdmins, upgradeAdminRole = controller.upgradeAdminRole, getOneUser = controller.getOneUser, deleteAdmin = controller.deleteAdmin;
router.delete('/request/:id', superadmin, deleteRequest);
router.get('/customers', superadmin, getAllCustomers);
router.get('/admins', superadmin, getAllAdmins);
router.put('/admin/upgrade/:id', superadmin, upgradeAdminRole);
router.get('/user/:id', superadmin, getOneUser);
router.delete('/admin/:id', superadmin, deleteAdmin);
// router.delete('/admins', superadmin, deleteAdmin)
module.exports = router;
