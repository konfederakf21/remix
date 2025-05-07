/*import { useLoaderData } from "@remix-run/react";
import { getRecipes } from "../api/recipe";
import { getCategories } from "../api/recipe";
import { Link } from "@remix-run/react";

export async function loader() {
  const recipeList = await getRecipes();
  const categoryList = await getCategories();

  return { recipeList, categoryList };
}

export default function Recipes() {
  const { recipeList } = useLoaderData();
  return (
    <>
      <h1>Login</h1>
      {recipeList.map((recipe) => (
        <main key={recipe.slug}>
          {" "}
          <h2>
            {" "}
            <Link to={`/recipe/${recipe.slug}`}>{recipe.name}</Link>
          </h2>
        </main>
      ))}
    </>
  );
}
*/

export default function Index() {
  return <></>;
}
