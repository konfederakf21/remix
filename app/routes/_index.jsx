import { Form, useActionData, redirect } from "@remix-run/react";
import { json } from "@remix-run/node";
import bcrypt from "bcryptjs";
import { sql } from "../api/sql";

export async function action({ request }) {
  const formData = await request.formData();
  const username = formData.get("username");
  const password = formData.get("password");

  if (!username || !password) {
    return json({ error: "Vyplňte všechna pole." });
  }

  try {
    const users = await sql(
      `SELECT * FROM social_user WHERE email = "${username}"`
    );

    if (!users || users.length === 0) {
      return json({ error: "Uživatel nebyl nalezen." });
    }

    const uzivatel = users[0];

    const hesloOK = await bcrypt.compare(password, uzivatel.heslo);

    if (!hesloOK) {
      return json({ error: "Nesprávné heslo." });
    }

    return redirect("/chat");
  } catch (error) {
    console.error(error);
    return json({ error: "Chyba při přihlašování." });
  }
}

export default function Login() {
  const actionData = useActionData();

  return (
    <div
      style={{
        maxWidth: "400px",
        margin: "auto",
        marginTop: "100px",
        padding: "2rem",
        border: "1px solid #ccc",
        borderRadius: "8px",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
      }}>
      <h1 style={{ textAlign: "center" }}>Přihlášení</h1>

      <Form method="post">
        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="username">E-mail</label>
          <input
            type="text"
            name="username"
            id="username"
            required
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.3rem" }}
          />
        </div>

        <div style={{ marginBottom: "1rem" }}>
          <label htmlFor="password">Heslo</label>
          <input
            type="password"
            name="password"
            id="password"
            required
            style={{ width: "100%", padding: "0.5rem", marginTop: "0.3rem" }}
          />
        </div>

        {actionData?.error && (
          <p style={{ color: "red", marginBottom: "1rem" }}>
            {actionData.error}
          </p>
        )}

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "0.5rem",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}>
          Přihlásit se
        </button>
      </Form>

      <p style={{ textAlign: "center", marginTop: "1rem" }}>
        Nemáš účet? <a href="/signin">Zaregistruj se</a>
      </p>
    </div>
  );
}
