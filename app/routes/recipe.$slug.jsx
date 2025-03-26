import { useLoaderData } from "@remix-run/react";
import { getRecipes } from "../api/recipe";

export async function loader({ params }) {
  const recipeSlug = params.slug;
  const recipeData = await getRecipes(recipeSlug);
  return recipeData[0];
}

export default function Detail() {
  const recipe = useLoaderData();

  return (
    <main>
      <h1>{recipe.name}</h1>
      <h1>{recipe.info}</h1>
    </main>
  );
}
