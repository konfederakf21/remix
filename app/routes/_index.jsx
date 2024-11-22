import "../css/general.css";
import Header3 from "../components/header";
import Food from "../components/food";
import Footer from "../components/footer";
import { useLoaderData } from @remix

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  let foodList = getFood();
  return cakeList;
  }
export default function Index() {
  let foodList = useLoaderData();

  return (
    <>
        <Header3 />
        <Offer foodList={foodList}
        />
    </>
  );
}
