import express from 'express';
import * as eventController from '../controllers/eventController.js';
import { validateEvent, handleValidationErrors } from '../middleware/validation.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

router.get('/', eventController.getEvents);
router.get('/my-events', authenticate, eventController.getUserEvents);
router.get('/:id', eventController.getEvent);
router.post('/', authenticate, validateEvent, handleValidationErrors, eventController.createEvent);
router.put('/:id', authenticate, validateEvent, handleValidationErrors, eventController.updateEvent);
router.delete('/:id', authenticate, eventController.deleteEvent);

export default router;