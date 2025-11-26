import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre de la categoría es requerido'],
    unique: true,
    trim: true
  },
  descripcion: {
    type: String,
    trim: true
  },
  color: {
    type: String,
    default: '#007bff'
  }
}, {
  timestamps: true
});

export default mongoose.model('Category', categorySchema);