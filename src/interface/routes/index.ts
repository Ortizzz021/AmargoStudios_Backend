import { Router } from 'express';
import authRoutes from './authRoutes';
import clienteRoutes from './clienteRoutes';
import cotizacionRoutes from './cotizacionRoutes';
import seguimientoRoutes from './seguimientoRoutes';
import perfilRoutes from './perfilRoutes';

const router = Router();

router.use('/auth', authRoutes);
router.use('/clientes', clienteRoutes);
router.use('/cotizaciones', cotizacionRoutes);
router.use('/seguimiento', seguimientoRoutes);
router.use('/perfiles', perfilRoutes);

export default router;
