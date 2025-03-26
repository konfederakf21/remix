/*import "../css/general.css";
import Header3 from "../3_components/header";
import Food from "../3_components/food";
import Footer from "../3_components/footer";
import { useLoaderData } from "@remix-run/react";
import { getFood } from "../3_components/api/food";
import AddFood from "../3_components/addFood";

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  let foodList = "";
  foodList = await getFood();
  return foodList;
}

export default function Index() {
  let foodList = useLoaderData();

  return (
    <>
      <Header3 />
      <AddFood action={"/newFood"} />
      {foodList.map((food) => (
        <Food
          image={food.image}
          title={food.title}
          price={food.price}
        />
      ))}
    </>
  );
}
*/
