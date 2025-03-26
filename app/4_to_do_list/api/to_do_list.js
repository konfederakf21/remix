import { sql } from "./sql";

export async function getTasks() {
  const response = await sql(`SELECT * FROM to_do_list`);
  console.log(response);

  let foodList = response;
  return foodList;
}

export async function insertFood(newFood) {
  const query = `INSERT INTO
    Do (title, deadline)
    VALUES ("${newFood.title}", ${newFood.price}, "${newFood.image}")`;
  console.log(query);
  const response = await sql(query);
  console.log(response);
  return null;
}
