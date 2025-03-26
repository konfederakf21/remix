import { useLoaderData } from "@remix-run/react";
import { getDetails } from "../api/contact";

export async function loader({ params }) {
  const contactId = params.id;
  const contactData = await getDetails(contactId);
  return contactData[0];
}

export default function Detail() {
  const contact = useLoaderData();

  return (
    <main>
      <h1>{contact.jmeno}</h1>
      <h1>{contact.prijmeni}</h1>
      <h1>{contact.tel}</h1>
      <h1>{contact.mail}</h1>
    </main>
  );
}
