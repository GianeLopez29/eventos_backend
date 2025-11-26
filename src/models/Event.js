import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema({
  titulo: {
    type: String,
    required: [true, 'El título es requerido'],
    trim: true
  },
  descripcion: {
    type: String,
    required: [true, 'La descripción es requerida'],
    trim: true
  },
  fecha: {
    type: Date,
    required: [true, 'La fecha es requerida']
  },
  hora: {
    type: String,
    required: [true, 'La hora es requerida']
  },
  ubicacion: {
    type: String,
    required: [true, 'La ubicación es requerida'],
    trim: true
  },
  precio: {
    type: Number,
    default: 0,
    min: 0
  },
  capacidad: {
    type: Number,
    required: [true, 'La capacidad es requerida'],
    min: 1
  },
  categoria: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    required: [true, 'La categoría es requerida']
  },
  organizador: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  imagen: {
    type: String,
    default: ''
  },
  estado: {
    type: String,
    enum: ['activo', 'cancelado', 'finalizado'],
    default: 'activo'
  }
}, {
  timestamps: true
});

export default mongoose.model('Event', eventSchema);