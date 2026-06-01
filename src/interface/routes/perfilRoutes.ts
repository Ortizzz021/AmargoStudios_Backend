import { Router } from 'express';
import { PrismaPerfilRepository } from '../../infrastructure/repositories/PrismaPerfilRepository';
import { GetPerfilByIdUseCase } from '../../application/use-cases/perfiles/GetPerfilByIdUseCase';
import { UpdatePerfilUseCase } from '../../application/use-cases/perfiles/UpdatePerfilUseCase';
import { PerfilController } from '../controllers/PerfilController';
import { authMiddleware } from '../middleware/authMiddleware';
import { validateRequest } from '../middleware/validateRequest';
import { updatePerfilSchema } from '../validators/perfilValidators';
import { uuidParamSchema } from '../validators/paramsValidators';

const router = Router();

const perfilRepository = new PrismaPerfilRepository();
const getPerfilByIdUseCase = new GetPerfilByIdUseCase(perfilRepository);
const updatePerfilUseCase = new UpdatePerfilUseCase(perfilRepository);

const perfilController = new PerfilController(getPerfilByIdUseCase, updatePerfilUseCase);

router.use(authMiddleware);

router.get('/:id', validateRequest(uuidParamSchema), perfilController.getById);
router.put('/:id', validateRequest(updatePerfilSchema), perfilController.update);

export default router;
