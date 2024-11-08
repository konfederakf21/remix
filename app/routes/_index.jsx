import "../css/general.css";
import Header3 from "../components/header";
import Food from "../components/food";
import Footer from "../components/footer";

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
      <Header3 />
      <Food
        img="https://cdn.pixabay.com/photo/2016/01/22/02/13/meat-1155132_640.jpg"
        title="Steak"
        price={200}
      />
      <Food
        img="https://cdn.pixabay.com/photo/2014/10/19/20/59/hamburger-494706_640.jpg"
        title="Burger"
        price={230}
      />
      <Food
        img="https://cdn.pixabay.com/photo/2016/11/19/02/22/schnipo-1837703_640.jpg"
        title="Kuřecí řízek"
        price={180}
      />
      <Footer />
    </>
  );
}
