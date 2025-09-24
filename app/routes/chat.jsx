import { useLoaderData, Form } from "@remix-run/react";
import { json, redirect } from "@remix-run/node";
import { sql } from "../api/sql";

// 🟢 Loader – načítání zpráv
export async function loader() {
  const response = await sql(
    `SELECT * FROM chat_messages ORDER BY created_at ASC`
  );
  const messages = Array.isArray(response?.data) ? response.data : [];
  return json(messages);
}

// 🟢 Action – uložení nové zprávy
export async function action({ request }) {
  const formData = await request.formData();
  const text = formData.get("text");

  if (text && text.trim() !== "") {
    await sql(
      `INSERT INTO chat_messages (text, created_at) VALUES ($1, NOW())`,
      [text]
    );
  }

  // po uložení přesměruj zpět na chat
  return redirect("/chat");
}

// 🟢 Komponenta Chat
export default function Chat() {
  const messages = useLoaderData();

  return (
    <main style={{ maxWidth: "600px", margin: "auto", padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>Můj chat</h1>

      {/* Zprávy */}
      <div
        style={{
          border: "1px solid #ccc",
          borderRadius: "8px",
          padding: "1rem",
          marginBottom: "1rem",
          height: "300px",
          overflowY: "auto",
          backgroundColor: "#fafafa",
        }}>
        {messages.length === 0 ? (
          <p style={{ textAlign: "center", color: "#666" }}>
            Zatím žádné zprávy.
          </p>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              style={{
                marginBottom: "0.75rem",
                padding: "0.5rem 0.75rem",
                background: "#e6f7ff",
                borderRadius: "6px",
              }}>
              <p style={{ margin: 0 }}>{msg.text}</p>
              <small style={{ fontSize: "0.75rem", color: "#555" }}>
                {new Date(msg.created_at).toLocaleTimeString()}
              </small>
            </div>
          ))
        )}
      </div>

      {/* Formulář na novou zprávu */}
      <Form
        method="post"
        style={{ display: "flex", gap: "0.5rem" }}>
        <input
          type="text"
          name="text"
          placeholder="Napiš zprávu..."
          required
          style={{
            flex: 1,
            padding: "0.5rem",
            borderRadius: "4px",
            border: "1px solid #ccc",
          }}
        />
        <button
          type="submit"
          style={{
            padding: "0.5rem 1rem",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: "pointer",
          }}>
          Poslat
        </button>
      </Form>
    </main>
  );
}
