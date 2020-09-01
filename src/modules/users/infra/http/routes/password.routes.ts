import { Router } from 'express';
import ForgotPasswordController from '../controllers/ForgotPasswordController';
import PasswordsController from '../controllers/PasswordsController';

const passwordRouter = Router();
const forgotPassword = new ForgotPasswordController();
const password = new PasswordsController();

passwordRouter.post('/forgot', forgotPassword.create);
passwordRouter.post('/reset', password.update);

export default passwordRouter;
