import { Form } from "@remix-run/react";

export default function AddContact({ action }) {
  return (
    <Form
      method="post"
      action={action}>
      <label htmlFor="first name">
        Jméno:
        <input
          type="text"
          name="jméno"
          placeholder="Jan"
        />
      </label>

      <label htmlFor="second name">
        Příjmení:
        <input
          type="text"
          name="příjmení"
          placeholder="Novák"
        />
      </label>

      <label htmlFor="mail">
        Cena:
        <input
          type="text"
          name="mail"
          placeholder="novak@seznam.cz"
        />
      </label>

      <label htmlFor="date">
        <input
          type="text"
          name="datum"
          placeholder="2000"
        />
      </label>

      <button type="submit">Přidat</button>
    </Form>
  );
}
