import * as eventService from '../services/eventService.js';

export const createEvent = async (req, res, next) => {
  try {
    const event = await eventService.createEvent(req.body, req.user._id);
    res.status(201).json({
      success: true,
      data: event
    });
  } catch (error) {
    next(error);
  }
};

export const getEvents = async (req, res, next) => {
  try {
    const { categoria, estado } = req.query;
    const filters = {};
    if (categoria) filters.categoria = categoria;
    if (estado) filters.estado = estado;

    const events = await eventService.getAllEvents(filters);
    res.json({
      success: true,
      data: events
    });
  } catch (error) {
    next(error);
  }
};

export const getEvent = async (req, res, next) => {
  try {
    const event = await eventService.getEventById(req.params.id);
    res.json({
      success: true,
      data: event
    });
  } catch (error) {
    next(error);
  }
};

export const updateEvent = async (req, res, next) => {
  try {
    const event = await eventService.updateEvent(req.params.id, req.body, req.user._id);
    res.json({
      success: true,
      data: event
    });
  } catch (error) {
    next(error);
  }
};

export const deleteEvent = async (req, res, next) => {
  try {
    await eventService.deleteEvent(req.params.id, req.user._id);
    res.json({
      success: true,
      message: 'Evento eliminado correctamente'
    });
  } catch (error) {
    next(error);
  }
};

export const getUserEvents = async (req, res, next) => {
  try {
    const events = await eventService.getUserEvents(req.user._id);
    res.json({
      success: true,
      data: events
    });
  } catch (error) {
    next(error);
  }
};