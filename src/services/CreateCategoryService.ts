import { getRepository } from 'typeorm';
import Category from '../models/Category';

class CreateCategoryService {
  public async execute(title: string): Promise<Category> {
    const categoryReposiory = getRepository(Category);
    const findCategory = await categoryReposiory.findOne({
      where: { title },
    });

    if (findCategory) {
      throw new Error('The category is already saved');
    }

    const category = categoryReposiory.create({
      title,
    });

    await categoryReposiory.save(category);

    return category;
  }
}
export default CreateCategoryService;
