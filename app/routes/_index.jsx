import Header from "../components/header";
import Footer from "../components/footer";
import Car from "../components/car";

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export default function Index() {
  return (
    <>
      <Header />
      <Car
        title="Škoda Octavia"
        img="https://cdn.pixabay.com/photo/2019/07/12/12/37/skoda-4332791_1280.jpg"
      />
      <Car
        title="Volkswagen"
        img="https://cdn.pixabay.com/photo/2019/07/12/12/49/vw-4332807_640.jpg"
      />
      <Car
        title="BMW"
        img="https://cdn.pixabay.com/photo/2021/06/23/22/02/bmw-6359790_640.jpg"
      />
      <Footer />
    </>
  );
}
