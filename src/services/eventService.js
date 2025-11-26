import * as eventRepository from '../repositories/eventRepository.js';
import * as categoryRepository from '../repositories/categoryRepository.js';

export const createEvent = async (eventData, userId) => {
  const category = await categoryRepository.findCategoryById(eventData.categoria);
  if (!category) {
    throw new Error('Categoría no encontrada');
  }

  return await eventRepository.createEvent({
    ...eventData,
    organizador: userId
  });
};

export const getAllEvents = async (filters = {}) => {
  return await eventRepository.findAllEvents(filters);
};

export const getEventById = async (id) => {
  const event = await eventRepository.findEventById(id);
  if (!event) {
    throw new Error('Evento no encontrado');
  }
  return event;
};

export const updateEvent = async (id, updateData, userId) => {
  const event = await eventRepository.findEventById(id);
  if (!event) {
    throw new Error('Evento no encontrado');
  }

  if (event.organizador._id.toString() !== userId) {
    throw new Error('No autorizado para editar este evento');
  }

  if (updateData.categoria) {
    const category = await categoryRepository.findCategoryById(updateData.categoria);
    if (!category) {
      throw new Error('Categoría no encontrada');
    }
  }

  return await eventRepository.updateEvent(id, updateData);
};

export const deleteEvent = async (id, userId) => {
  const event = await eventRepository.findEventById(id);
  if (!event) {
    throw new Error('Evento no encontrado');
  }

  if (event.organizador._id.toString() !== userId) {
    throw new Error('No autorizado para eliminar este evento');
  }

  return await eventRepository.deleteEvent(id);
};

export const getUserEvents = async (userId) => {
  return await eventRepository.findEventsByUser(userId);
};

export const getEventsByCategory = async (categoryId) => {
  return await eventRepository.findEventsByCategory(categoryId);
};