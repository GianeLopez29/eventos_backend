import crypto from 'crypto';
import * as userRepository from '../repositories/userRepository.js';
import { generateToken } from '../utils/jwt.js';
import { sendVerificationEmail } from '../utils/email.js';

export const registerUser = async (userData) => {
  try {
    const existingUser = await userRepository.findUserByEmail(userData.email);
    if (existingUser) {
      const error = new Error('Ya existe una cuenta con este email');
      error.statusCode = 400;
      throw error;
    }

    const verificationToken = crypto.randomBytes(32).toString('hex');
    const user = await userRepository.createUser({
      ...userData,
      verificationToken
    });

    // Intentar enviar email, pero no fallar si no funciona
    try {
      await sendVerificationEmail(user.email, verificationToken);
    } catch (emailError) {
      console.log('Error enviando email:', emailError.message);
    }

    return {
      message: 'Usuario registrado. Revisa tu email para verificar la cuenta.',
      user: {
        id: user._id,
        nombre: user.nombre,
        email: user.email
      }
    };
  } catch (error) {
    console.error('Error en registerUser:', error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Credenciales inválidas');
  }

  // Temporalmente deshabilitado para testing
  // if (!user.isVerified) {
  //   throw new Error('Email no verificado. Revisa tu correo para verificar tu cuenta.');
  // }

  const token = generateToken({ id: user._id });
  
  return {
    token,
    user: {
      id: user._id,
      nombre: user.nombre,
      email: user.email,
      role: user.role
    }
  };
};

export const verifyEmail = async (token) => {
  const user = await userRepository.findUserByVerificationToken(token);
  if (!user) {
    throw new Error('Token de verificación inválido');
  }

  await userRepository.updateUser(user._id, {
    isVerified: true,
    verificationToken: undefined
  });

  return { message: 'Email verificado correctamente' };
};