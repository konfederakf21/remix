import "../css/general.css";
import Header3 from "../components/header";
import Food from "../components/food";
import Footer from "../components/footer";
import { useLoaderData } from "@remix-run/react";
import { getFood } from "../components/api/food.server";

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  let foodList = getFood();
  return foodList;
}
export default function Index() {
  let foodList = useLoaderData();

  return (
    <>
      <Header3 />
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
