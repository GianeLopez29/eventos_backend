import Event from '../models/Event.js';

export const createEvent = async (eventData) => {
  return await Event.create(eventData);
};

export const findAllEvents = async (filters = {}) => {
  return await Event.find(filters)
    .populate('categoria', 'nombre color')
    .populate('organizador', 'nombre email')
    .sort({ fecha: 1 });
};

export const findEventById = async (id) => {
  return await Event.findById(id)
    .populate('categoria', 'nombre color descripcion')
    .populate('organizador', 'nombre email');
};

export const updateEvent = async (id, updateData) => {
  return await Event.findByIdAndUpdate(id, updateData, { new: true })
    .populate('categoria', 'nombre color')
    .populate('organizador', 'nombre email');
};

export const deleteEvent = async (id) => {
  return await Event.findByIdAndDelete(id);
};

export const findEventsByUser = async (userId) => {
  return await Event.find({ organizador: userId })
    .populate('categoria', 'nombre color')
    .sort({ fecha: 1 });
};

export const findEventsByCategory = async (categoryId) => {
  return await Event.find({ categoria: categoryId })
    .populate('categoria', 'nombre color')
    .populate('organizador', 'nombre email')
    .sort({ fecha: 1 });
};