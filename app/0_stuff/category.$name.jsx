import { useLoaderData } from "@remix-run/react";
import { getCategories } from "../api/recipe";

export async function loader({ params }) {
  const categoryName = params.name;
  const categoryData = await getCategories(categoryName);
  return categoryData[0];
}

export default function Detail2() {
  const category = useLoaderData();

  return (
    <main>
      <h1>{category.type}</h1>
    </main>
  );
}
