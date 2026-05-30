import { Router } from 'express';
import { PrismaClienteRepository } from '../../infrastructure/repositories/PrismaClienteRepository';
import { CreateClienteUseCase } from '../../application/use-cases/clientes/CreateClienteUseCase';
import { GetClientesUseCase } from '../../application/use-cases/clientes/GetClientesUseCase';
import { GetClienteByIdUseCase } from '../../application/use-cases/clientes/GetClienteByIdUseCase';
import { UpdateClienteUseCase } from '../../application/use-cases/clientes/UpdateClienteUseCase';
import { DeleteClienteUseCase } from '../../application/use-cases/clientes/DeleteClienteUseCase';
import { ClienteController } from '../controllers/ClienteController';
import { authMiddleware } from '../middleware/authMiddleware';
import { roleMiddleware } from '../middleware/roleMiddleware';
import { validateRequest } from '../middleware/validateRequest';
import { createClienteSchema, updateClienteSchema, getClientesQuerySchema } from '../validators/clienteValidators';

const router = Router();

const clienteRepository = new PrismaClienteRepository();
const createClienteUseCase = new CreateClienteUseCase(clienteRepository);
const getClientesUseCase = new GetClientesUseCase(clienteRepository);
const getClienteByIdUseCase = new GetClienteByIdUseCase(clienteRepository);
const updateClienteUseCase = new UpdateClienteUseCase(clienteRepository);
const deleteClienteUseCase = new DeleteClienteUseCase(clienteRepository);

const clienteController = new ClienteController(
  createClienteUseCase,
  getClientesUseCase,
  getClienteByIdUseCase,
  updateClienteUseCase,
  deleteClienteUseCase,
);

router.use(authMiddleware);

router.post('/', validateRequest(createClienteSchema), clienteController.create);
router.get('/', validateRequest(getClientesQuerySchema), clienteController.getAll);
router.get('/:id', clienteController.getById);
router.put('/:id', validateRequest(updateClienteSchema), clienteController.update);
router.delete('/:id', roleMiddleware(['admin']), clienteController.delete);

export default router;
