import { sql } from "./sql";

export async function getContacts() {
  const response = await sql(`SELECT * FROM contacts`);
  console.log(response);

  let contactList = response;
  return contactList;
}

export async function getDetails(id) {
  const response = await sql(`SELECT * FROM contacts WHERE id=${id}`);
  console.log(response);

  let contactData = response;
  return contactData;
}
