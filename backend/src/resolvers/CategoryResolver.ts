import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Category, NewCategoryInput } from "../entities/category";

@Resolver(Category)
class CategoryResolver {
  @Query(() => [Category])
  async getAllCategories() {
    const categories = await Category.find();
    return categories;
  }

  @Query(() => Category)
  async getCategoryById(@Arg("id") id: number): Promise<Category | null> {
    return await Category.findOneBy({ id: id });
  }

  @Mutation(() => Category)
  async addCategory(@Arg("data") { name }: NewCategoryInput) {
    const result = await Category.create({
      name,
    }).save();

    return result;
  }

  @Mutation(() => Category)
  async deleteCategory(@Arg("id") id: number): Promise<Category | null> {
    const category = await Category.findOneBy({ id: id });

    if (!category) {
      throw new Error("Category not found");
    }

    await Category.delete(id);

    return category;
  }
}

export default CategoryResolver;
