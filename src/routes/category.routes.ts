import { getRepository } from 'typeorm';
import { Router } from 'express';
import Category from '../models/Category';
import CreateCategoryService from '../services/CreateCategoryService';

// import TransactionsRepository from '../repositories/TransactionsRepository';
// import CreateTransactionService from '../services/CreateTransactionService';
// import DeleteTransactionService from '../services/DeleteTransactionService';
// import ImportTransactionsService from '../services/ImportTransactionsService';

const categoriesRouter = Router();

categoriesRouter.get('/', async (request, response) => {
  const categoriesRepository = getRepository(Category);
  const categories = await categoriesRepository.find();
  response.json(categories);
});

categoriesRouter.post('/', async (request, response) => {
  const { title } = request.body;
  const createCategory = new CreateCategoryService();
  const category = await createCategory.execute(title);
  response.json(category);
});

export default categoriesRouter;
