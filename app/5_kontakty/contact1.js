import { sql } from "./sql";

export async function getContacts() {
  const response = await sql(`SELECT * FROM kontakty`);
  console.log(response);

  let foodList = response;
  return foodList;
}

export async function insertContact(newContact) {
  const query = `INSERT INTO
    contact (name, name2, mail, date)
    VALUES ("${newContact.name}", "${newContact.name2}," "${newContact.mail}", "${newContact.date}")`;
  console.log(query);
  const response = await sql(query);
  console.log(response);
  return null;
}
