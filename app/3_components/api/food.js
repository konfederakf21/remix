import { sql } from "./sql";

export async function getFood() {
  const response = await sql(`SELECT * FROM food`);
  console.log(response);

  let foodList = response;
  return foodList;
}

export async function insertFood(newFood) {
  const query = `INSERT INTO
    food (title, price, image)
    VALUES ("${newFood.title}", ${newFood.price}, "${newFood.image}")`;
  console.log(query);
  const response = await sql(query);
  console.log(response);
  return null;
}

/* let foodList = [
    {
      title: "Steak",
      price: 259,
      image:
        "https://cdn.pixabay.com/photo/2016/01/22/02/13/meat-1155132_640.jpg",
    },
    {
      title: "Burger",
      price: 230,
      image:
        "https://cdn.pixabay.com/photo/2014/10/19/20/59/hamburger-494706_640.jpg",
    },
    {
      title: "Kuřecí řízek",
      price: 180,
      image:
        "https://cdn.pixabay.com/photo/2016/11/19/02/22/schnipo-1837703_640.jpg",
    },
  ];
*/
