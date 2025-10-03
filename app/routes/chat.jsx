// app/routes/chat.jsx
import { useLoaderData, useFetcher } from "@remix-run/react";
import { json } from "@remix-run/node";
import { useEffect, useRef, useState } from "react";
import { sql } from "../api/sql"; // používáme tvůj původní sql(helper) BEZ úprav

// jednoduché parsování odpovědi z gate.php -> pole řádků
function parseSqlResponse(res) {
  if (!res) return [];
  if (Array.isArray(res)) return res;
  if (Array.isArray(res.data)) return res.data;
  if (Array.isArray(res.rows)) return res.rows;
  return [];
}

// jednoduchý escape pro SQL literal (zdvojení apostrofů)
function escapeSQLLiteral(s) {
  return String(s).replace(/'/g, "''");
}

export async function loader() {
  const res = await sql(
    `SELECT id, text, created_at FROM chat_messages ORDER BY created_at ASC`
  );
  const messages = parseSqlResponse(res);
  return json(messages);
}

export async function action({ request }) {
  try {
    const formData = await request.formData();
    const textRaw = String(formData.get("text") ?? "").trim();

    if (!textRaw) {
      return json({ ok: false, error: "Prázdná zpráva" }, { status: 400 });
    }

    // bezpečnost / limit délky
    const MAX_LEN = 2000;
    const safeText =
      textRaw.length > MAX_LEN ? textRaw.slice(0, MAX_LEN) : textRaw;
    const escaped = escapeSQLLiteral(safeText);

    // INSERT (používáme tvůj gate bez parametrů)
    const insertSql = `INSERT INTO chat_messages (text, created_at) VALUES ('${escaped}', NOW())`;
    await sql(insertSql);

    // ihned načteme všechny zprávy a vrátíme je v response (client je použije)
    const resAfter = await sql(
      `SELECT id, text, created_at FROM chat_messages ORDER BY created_at ASC`
    );
    const messages = parseSqlResponse(resAfter);

    // vracíme přímo pole zpráv (fetcher.data bude pole)
    return json(messages);
  } catch (err) {
    console.error("Action error:", err);
    return json(
      { ok: false, error: err?.message ?? "Server error" },
      { status: 500 }
    );
  }
}

export default function Chat() {
  const initialMessages = useLoaderData();
  const fetcher = useFetcher();
  const [messages, setMessages] = useState(initialMessages || []);
  const inputRef = useRef(null);
  const pendingRef = useRef(0);
  const containerRef = useRef(null);

  // když akce vrátí pole zpráv, nastavíme je
  useEffect(() => {
    if (Array.isArray(fetcher.data)) {
      setMessages(fetcher.data);
    }
  }, [fetcher.data]);

  // optimistické přidání (krátká UX vylepšení) - nemusíš mít, ale nechávám
  function handleSubmitOptimistic(e) {
    const fd = new FormData(e.currentTarget);
    const text = String(fd.get("text") ?? "").trim();
    if (!text) return;

    const tempId = `temp-${Date.now()}-${++pendingRef.current}`;
    const tempMsg = {
      id: tempId,
      text,
      created_at: new Date().toISOString(),
      _optimistic: true,
    };

    setMessages((m) => [...m, tempMsg]);

    if (inputRef.current) inputRef.current.value = "";
  }

  // scroll to bottom po změně zpráv
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <main style={{ maxWidth: "600px", margin: "auto", padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "1rem" }}>Můj chat</h1>

      <div
        ref={containerRef}
        id="messages-container"
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
                background: msg._optimistic ? "#fff4e5" : "#e6f7ff",
                borderRadius: "6px",
                opacity: msg._optimistic ? 0.85 : 1,
              }}>
              <p style={{ margin: 0 }}>{msg.text}</p>
              <small style={{ fontSize: "0.75rem", color: "#555" }}>
                {new Date(msg.created_at).toLocaleString()}
              </small>
            </div>
          ))
        )}
      </div>

      {/* useFetcher Form – action vrací pole zpráv, takže fetcher.data bude obsahovat aktualizovaný seznam */}
      <fetcher.Form
        method="post"
        onSubmit={handleSubmitOptimistic}
        style={{ display: "flex", gap: "0.5rem" }}>
        <input
          ref={inputRef}
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
          disabled={fetcher.state === "submitting"}
          style={{
            padding: "0.5rem 1rem",
            background: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: fetcher.state === "submitting" ? "not-allowed" : "pointer",
          }}>
          {fetcher.state === "submitting" ? "Odesílám…" : "Poslat"}
        </button>
      </fetcher.Form>

      <div style={{ marginTop: "0.5rem", color: "#666", fontSize: "0.9rem" }}>
        Stav: {fetcher.state}
      </div>
    </main>
  );
}
