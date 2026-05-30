import { Router } from 'express';
import { PrismaClienteRepository } from '../../infrastructure/repositories/PrismaClienteRepository';
import { PrismaCotizacionRepository } from '../../infrastructure/repositories/PrismaCotizacionRepository';
import { SubmitContactUseCase } from '../../application/use-cases/contact/SubmitContactUseCase';
import { ContactController } from '../controllers/ContactController';
import { validateRequest } from '../middleware/validateRequest';
import { submitContactSchema } from '../validators/contactValidators';

const router = Router();

const clienteRepository = new PrismaClienteRepository();
const cotizacionRepository = new PrismaCotizacionRepository();
const submitContactUseCase = new SubmitContactUseCase(clienteRepository, cotizacionRepository);
const contactController = new ContactController(submitContactUseCase);

router.post('/', validateRequest(submitContactSchema), contactController.submit);

export default router;
