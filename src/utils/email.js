import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

export const sendVerificationEmail = async (email, token) => {
  const verificationUrl = `${process.env.CLIENT_URL}/verify-email/${token}`;
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Verificación de cuenta - Sistema de Eventos',
    html: `
      <h1>Verificación de cuenta</h1>
      <p>Haz clic en el siguiente enlace para verificar tu cuenta:</p>
      <a href="${verificationUrl}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Verificar cuenta</a>
      <p>Si no puedes hacer clic en el enlace, copia y pega esta URL en tu navegador:</p>
      <p>${verificationUrl}</p>
    `
  };

  await transporter.sendMail(mailOptions);
};