import { Form } from "@remix-run/react";

export default function AddFood({ action }) {
  return (
    <Form
      method="post"
      action={action}>
      <label htmlFor="title">
        Název jídla:
        <input
          type="text"
          name="title"
          placeholder="Název"
        />
      </label>

      <label htmlFor="price">
        Cena:
        <input
          type="number"
          name="price"
          placeholder="99"
        />
      </label>

      <label htmlFor="image">
        <input
          type="text"
          name="image"
          placeholder="Link"
        />
      </label>

      <button type="submit">Přidat</button>
    </Form>
  );
}
