import { sql } from "./sql";

export async function getRecipes() {
  const response = await sql(`SELECT * FROM social_user`);
  console.log(response);

  let recipeList = response;
  return recipeList;
}

export async function getCategories() {
  const response = await sql(`SELECT * FROM categories`);
  console.log(response);

  let categoryList = response;
  return categoryList;
}

export async function getRecipesDetail(slug) {
  const response = await sql(`SELECT * FROM social_user WHERE slug=${slug}`);
  console.log(response);

  let recipeData = response;
  return recipeData;
}

export async function getCategoriesDetail(name) {
  const response = await sql(`SELECT * FROM social_user WHERE slug=${name}`);
  console.log(response);

  let categoryData = response;
  return categoryData;
}
