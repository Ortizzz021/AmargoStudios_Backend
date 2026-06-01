import { Router } from 'express';
import { PrismaSeguimientoRepository } from '../../infrastructure/repositories/PrismaSeguimientoRepository';
import { PrismaClienteRepository } from '../../infrastructure/repositories/PrismaClienteRepository';
import { PrismaPerfilRepository } from '../../infrastructure/repositories/PrismaPerfilRepository';
import { CreateSeguimientoUseCase } from '../../application/use-cases/seguimiento/CreateSeguimientoUseCase';
import { GetSeguimientosByClienteUseCase } from '../../application/use-cases/seguimiento/GetSeguimientosByClienteUseCase';
import { DeleteSeguimientoUseCase } from '../../application/use-cases/seguimiento/DeleteSeguimientoUseCase';
import { SeguimientoController } from '../controllers/SeguimientoController';
import { authMiddleware } from '../middleware/authMiddleware';
import { validateRequest } from '../middleware/validateRequest';
import { createSeguimientoSchema } from '../validators/seguimientoValidators';
import { uuidParamSchema } from '../validators/paramsValidators';

const router = Router();

const seguimientoRepository = new PrismaSeguimientoRepository();
const clienteRepository = new PrismaClienteRepository();
const perfilRepository = new PrismaPerfilRepository();

const createSeguimientoUseCase = new CreateSeguimientoUseCase(
  seguimientoRepository,
  clienteRepository,
  perfilRepository,
);
const getSeguimientosByClienteUseCase = new GetSeguimientosByClienteUseCase(
  seguimientoRepository,
  clienteRepository,
);
const deleteSeguimientoUseCase = new DeleteSeguimientoUseCase(seguimientoRepository);

const seguimientoController = new SeguimientoController(
  createSeguimientoUseCase,
  getSeguimientosByClienteUseCase,
  deleteSeguimientoUseCase,
);

router.use(authMiddleware);

router.post('/', validateRequest(createSeguimientoSchema), seguimientoController.create);
router.get('/', seguimientoController.getByCliente);
router.delete('/:id', validateRequest(uuidParamSchema), seguimientoController.delete);

export default router;
