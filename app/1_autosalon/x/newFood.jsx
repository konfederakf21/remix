/*import { redirect } from "@remix-run/server-runtime";
import { insertFood } from "../3_components/api/food";

export async function action({ request }) {
  const newFoodData = await request.formData();
  const newFood = {
    title: newFoodData.get("title"),
    price: newFoodData.get("price"),
    image: newFoodData.get("image"),
  };

  console.log(newFood);
  await insertFood(newFood);

  return redirect("/");
}
*/
