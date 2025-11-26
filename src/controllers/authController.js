import * as authService from '../services/authService.js';

export const register = async (req, res, next) => {
  try {
    console.log('Datos recibidos para registro:', req.body);
    const result = await authService.registerUser(req.body);
    console.log('Usuario registrado exitosamente:', result);
    res.status(201).json({
      success: true,
      ...result
    });
  } catch (error) {
    console.error('Error en registro:', error);
    if (error.statusCode) {
      return res.status(error.statusCode).json({
        success: false,
        message: error.message
      });
    }
    return res.status(500).json({
      success: false,
      message: error.message || 'Error interno del servidor'
    });
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const result = await authService.loginUser(email, password);
    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: error.message
    });
  }
};

export const verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.params;
    const result = await authService.verifyEmail(token);
    res.json({
      success: true,
      ...result
    });
  } catch (error) {
    next(error);
  }
};

export const getProfile = async (req, res) => {
  res.json({
    success: true,
    user: req.user
  });
};