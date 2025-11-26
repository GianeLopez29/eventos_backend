import * as categoryRepository from '../repositories/categoryRepository.js';

export const createCategory = async (categoryData) => {
  return await categoryRepository.createCategory(categoryData);
};

export const getAllCategories = async () => {
  return await categoryRepository.findAllCategories();
};

export const getCategoryById = async (id) => {
  const category = await categoryRepository.findCategoryById(id);
  if (!category) {
    throw new Error('Categoría no encontrada');
  }
  return category;
};

export const updateCategory = async (id, updateData) => {
  const category = await categoryRepository.updateCategory(id, updateData);
  if (!category) {
    throw new Error('Categoría no encontrada');
  }
  return category;
};

export const deleteCategory = async (id) => {
  const category = await categoryRepository.deleteCategory(id);
  if (!category) {
    throw new Error('Categoría no encontrada');
  }
  return category;
};