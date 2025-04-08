import { Router } from 'express';
import dashboardRoutes from './dashboard';
import accountsRoutes from './accounts';
import transactionsRoutes from './transactions';
import budgetsRoutes from './budgets';

const router = Router();

// Register routes
router.use('/dashboard', dashboardRoutes);
router.use('/accounts', accountsRoutes);
router.use('/transactions', transactionsRoutes);
router.use('/budgets', budgetsRoutes);

export default router;
