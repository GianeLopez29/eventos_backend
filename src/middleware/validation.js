import { body, validationResult } from 'express-validator';

export const validateRegister = [
  body('nombre').notEmpty().withMessage('El nombre es requerido'),
  body('email').isEmail().withMessage('Email inválido'),
  body('password').isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres')
];

export const validateLogin = [
  body('email').isEmail().withMessage('Email inválido'),
  body('password').notEmpty().withMessage('La contraseña es requerida')
];

export const validateEvent = [
  body('titulo').notEmpty().withMessage('El título es requerido'),
  body('descripcion').notEmpty().withMessage('La descripción es requerida'),
  body('fecha').isISO8601().withMessage('Fecha inválida'),
  body('hora').notEmpty().withMessage('La hora es requerida'),
  body('ubicacion').notEmpty().withMessage('La ubicación es requerida'),
  body('capacidad').isInt({ min: 1 }).withMessage('La capacidad debe ser un número mayor a 0'),
  body('categoria').notEmpty().withMessage('La categoría es requerida')
];

export const validateCategory = [
  body('nombre').notEmpty().withMessage('El nombre es requerido')
];

export const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Errores de validación',
      errors: errors.array()
    });
  }
  next();
};