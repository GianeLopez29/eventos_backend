import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`MongoDB conectado exitosamente: ${conn.connection.host}`);
    console.log(`Base de datos: ${conn.connection.name}`);
  } catch (error) {
    console.error('Error conectando a MongoDB:', error.message);
    console.error('URI utilizada:', process.env.MONGODB_URI ? 'URI configurada' : 'URI no configurada');
    throw error; // Fallar si no hay conexión
  }
};

export default connectDB;