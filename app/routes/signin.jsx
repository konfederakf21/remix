import { Form, useActionData, Link } from "@remix-run/react";
import { sql } from "../api/sql";
import bcrypt from "bcryptjs";

// Backendová funkce pro zpracování formuláře
export async function action({ request }) {
  const formData = await request.formData();
  const jmeno = formData.get("jmeno");
  const email = formData.get("email");
  const heslo = formData.get("heslo");

  if (!jmeno || !email || !heslo) {
    return { error: "Vyplň všechna pole." };
  }

  const kontrola = await sql(
    `SELECT * FROM social_user WHERE email = "${email}"`
  );
  if (kontrola?.length > 0) {
    return { error: "Uživatel s tímto e-mailem už existuje." };
  }

  const hashovaneHeslo = await bcrypt.hash(heslo, 10);

  const query = `
    INSERT INTO social_user (jmeno, email, heslo)
    VALUES ("${jmeno}", "${email}", "${hashovaneHeslo}")
  `;
  const result = await sql(query);

  if (result?.error) {
    return { error: result.error };
  }

  return { success: "Úspěšně zaregistrováno!" };
}

// Komponenta UI
export default function SignIn() {
  const actionData = useActionData();

  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f4f4f4",
      }}>
      <div
        style={{
          background: "white",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 0 20px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
        }}>
        <h1 style={{ marginBottom: "1.5rem", textAlign: "center" }}>
          Registrace
        </h1>

        <Form method="post">
          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="jmeno"
              style={{ display: "block", marginBottom: "0.5rem" }}>
              Jméno
            </label>
            <input
              type="text"
              name="jmeno"
              id="jmeno"
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="email"
              style={{ display: "block", marginBottom: "0.5rem" }}>
              E-mail
            </label>
            <input
              type="email"
              name="email"
              id="email"
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label
              htmlFor="heslo"
              style={{ display: "block", marginBottom: "0.5rem" }}>
              Heslo
            </label>
            <input
              type="password"
              name="heslo"
              id="heslo"
              required
              style={{
                width: "100%",
                padding: "0.5rem",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
            />
          </div>

          {actionData?.error && (
            <p style={{ color: "red", marginBottom: "1rem" }}>
              {actionData.error}
            </p>
          )}
          {actionData?.success && (
            <p style={{ color: "green", marginBottom: "1rem" }}>
              {actionData.success}
            </p>
          )}

          <button
            type="submit"
            style={{
              width: "100%",
              padding: "0.75rem",
              backgroundColor: "#0070f3",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontWeight: "bold",
              marginBottom: "1rem",
            }}>
            Zaregistrovat
          </button>
        </Form>

        <p style={{ textAlign: "center" }}>
          Už máš účet?{" "}
          <Link
            to="/?index"
            style={{ color: "#0070f3", textDecoration: "underline" }}>
            Přihlas se zde
          </Link>
        </p>
      </div>
    </main>
  );
}
