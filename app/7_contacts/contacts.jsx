/*import { useLoaderData } from "@remix-run/react";
import { getContacts } from "../api/offer";
import { Link } from "@remix-run/react";

export async function loader() {
  const contactList = await getContacts();

  return contactList;
}

export default function Contacts() {
  const contactList = useLoaderData();
  return (
    <>
      <h1>Contacts</h1>

      {contactList.map((contact) => (
        <main>
          <h1 key={contact.id}>
            <Link to={`/detail/${contact.id}`}>
              {contact.jmeno} {contact.prijmeni}
            </Link>
          </h1>
        </main>
      ))}
    </>
  );
}
*/
