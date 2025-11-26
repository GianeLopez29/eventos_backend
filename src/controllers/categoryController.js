import * as categoryService from '../services/categoryService.js';

export const createCategory = async (req, res, next) => {
  try {
    const category = await categoryService.createCategory(req.body);
    res.status(201).json({
      success: true,
      data: category
    });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await categoryService.getAllCategories();
    res.json({
      success: true,
      data: categories
    });
  } catch (error) {
    next(error);
  }
};

export const getCategory = async (req, res, next) => {
  try {
    const category = await categoryService.getCategoryById(req.params.id);
    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const category = await categoryService.updateCategory(req.params.id, req.body);
    res.json({
      success: true,
      data: category
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    await categoryService.deleteCategory(req.params.id);
    res.json({
      success: true,
      message: 'Categoría eliminada correctamente'
    });
  } catch (error) {
    next(error);
  }
};