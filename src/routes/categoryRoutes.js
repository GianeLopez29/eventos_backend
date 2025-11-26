import express from 'express';
import * as categoryController from '../controllers/categoryController.js';
import { validateCategory, handleValidationErrors } from '../middleware/validation.js';
import { authenticate, authorize } from '../middleware/auth.js';

const router = express.Router();

router.get('/', categoryController.getCategories);
router.get('/:id', categoryController.getCategory);
router.post('/', authenticate, authorize('admin'), validateCategory, handleValidationErrors, categoryController.createCategory);
router.put('/:id', authenticate, authorize('admin'), validateCategory, handleValidationErrors, categoryController.updateCategory);
router.delete('/:id', authenticate, authorize('admin'), categoryController.deleteCategory);

export default router;