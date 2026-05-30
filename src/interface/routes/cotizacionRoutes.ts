import { Router } from 'express';
import { PrismaCotizacionRepository } from '../../infrastructure/repositories/PrismaCotizacionRepository';
import { PrismaClienteRepository } from '../../infrastructure/repositories/PrismaClienteRepository';
import { PrismaPerfilRepository } from '../../infrastructure/repositories/PrismaPerfilRepository';
import { CreateCotizacionUseCase } from '../../application/use-cases/cotizaciones/CreateCotizacionUseCase';
import { GetCotizacionesUseCase } from '../../application/use-cases/cotizaciones/GetCotizacionesUseCase';
import { GetCotizacionByIdUseCase } from '../../application/use-cases/cotizaciones/GetCotizacionByIdUseCase';
import { UpdateCotizacionUseCase } from '../../application/use-cases/cotizaciones/UpdateCotizacionUseCase';
import { DeleteCotizacionUseCase } from '../../application/use-cases/cotizaciones/DeleteCotizacionUseCase';
import { CotizacionController } from '../controllers/CotizacionController';
import { authMiddleware } from '../middleware/authMiddleware';
import { roleMiddleware } from '../middleware/roleMiddleware';
import { validateRequest } from '../middleware/validateRequest';
import { createCotizacionSchema, updateCotizacionSchema, getCotizacionesQuerySchema } from '../validators/cotizacionValidators';

const router = Router();

const cotizacionRepository = new PrismaCotizacionRepository();
const clienteRepository = new PrismaClienteRepository();
const perfilRepository = new PrismaPerfilRepository();

const createCotizacionUseCase = new CreateCotizacionUseCase(cotizacionRepository, clienteRepository);
const getCotizacionesUseCase = new GetCotizacionesUseCase(cotizacionRepository);
const getCotizacionByIdUseCase = new GetCotizacionByIdUseCase(cotizacionRepository);
const updateCotizacionUseCase = new UpdateCotizacionUseCase(cotizacionRepository, perfilRepository);
const deleteCotizacionUseCase = new DeleteCotizacionUseCase(cotizacionRepository);

const cotizacionController = new CotizacionController(
  createCotizacionUseCase,
  getCotizacionesUseCase,
  getCotizacionByIdUseCase,
  updateCotizacionUseCase,
  deleteCotizacionUseCase,
);

router.use(authMiddleware);

router.post('/', validateRequest(createCotizacionSchema), cotizacionController.create);
router.get('/', validateRequest(getCotizacionesQuerySchema), cotizacionController.getAll);
router.get('/:id', cotizacionController.getById);
router.put('/:id', validateRequest(updateCotizacionSchema), cotizacionController.update);
router.delete('/:id', roleMiddleware(['admin']), cotizacionController.delete);

export default router;
