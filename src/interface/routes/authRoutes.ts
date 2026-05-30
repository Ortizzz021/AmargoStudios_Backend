import { Router } from 'express';
import { PrismaPerfilRepository } from '../../infrastructure/repositories/PrismaPerfilRepository';
import { RegisterUseCase } from '../../application/use-cases/auth/RegisterUseCase';
import { LoginUseCase } from '../../application/use-cases/auth/LoginUseCase';
import { AuthController } from '../controllers/AuthController';
import { validateRequest } from '../middleware/validateRequest';
import { registerSchema, loginSchema } from '../validators/authValidators';

const router = Router();

const perfilRepository = new PrismaPerfilRepository();
const registerUseCase = new RegisterUseCase(perfilRepository);
const loginUseCase = new LoginUseCase(perfilRepository);
const authController = new AuthController(registerUseCase, loginUseCase);

router.post('/register', validateRequest(registerSchema), authController.register);
router.post('/login', validateRequest(loginSchema), authController.login);

export default router;
