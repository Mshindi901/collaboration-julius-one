import {
    signin,
    signup,
    admin_sign_up,
    get_user
} from '../controllers/user.controller.js';
import express from 'express';

const router = express.Router();

router.post('/users/signup', signup);
router.post('/users/signin', signin);
router.post('/users/admin/signup', admin_sign_up);
router.get('/users/get-user/:id', get_user);

export default router;