import crypto from 'crypto';
import * as userRepository from '../repositories/userRepository.js';
import { generateToken } from '../utils/jwt.js';
import { sendVerificationEmail } from '../utils/email.js';

export const registerUser = async (userData) => {
  const existingUser = await userRepository.findUserByEmail(userData.email);
  if (existingUser) {
    throw new Error('El usuario ya existe');
  }

  const verificationToken = crypto.randomBytes(32).toString('hex');
  const user = await userRepository.createUser({
    ...userData,
    verificationToken
  });

  await sendVerificationEmail(user.email, verificationToken);

  return {
    message: 'Usuario registrado. Revisa tu email para verificar la cuenta.',
    user: {
      id: user._id,
      nombre: user.nombre,
      email: user.email
    }
  };
};

export const loginUser = async (email, password) => {
  const user = await userRepository.findUserByEmail(email);
  if (!user || !(await user.comparePassword(password))) {
    throw new Error('Credenciales inválidas');
  }

  if (!user.isVerified) {
    throw new Error('Email no verificado. Revisa tu correo para verificar tu cuenta.');
  }

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