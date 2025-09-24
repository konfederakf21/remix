import { useLoaderData } from "@remix-run/react";
import { json } from "@remix-run/node";
import { sql } from "../api/sql";

export async function loader() {
  const response = await sql(
    `SELECT * FROM social_posts ORDER BY created_at DESC`
  );
  const posts = Array.isArray(response?.data) ? response.data : [];
  return json(posts);
}

export default function Dashboard() {
  const posts = useLoaderData();

  return (
    <main style={{ maxWidth: "800px", margin: "auto", padding: "2rem" }}>
      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>
        Dashboard – Příspěvky
      </h1>

      {posts.length === 0 ? (
        <p style={{ textAlign: "center", color: "#666" }}>
          Žádné příspěvky zatím nejsou.
        </p>
      ) : (
        <div
          style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
          {posts.map((post) => (
            <div
              key={post.id}
              style={{
                padding: "1rem",
                border: "1px solid #ccc",
                borderRadius: "8px",
                backgroundColor: "#f9f9f9",
              }}>
              <h2 style={{ margin: "0 0 0.5rem" }}>{post.nazev}</h2>
              <p style={{ color: "#999", fontSize: "0.85rem", margin: 0 }}>
                {new Date(post.created_at).toLocaleString()}
              </p>

              {post.obrazek && (
                <img
                  src={post.obrazek}
                  alt="Obrázek příspěvku"
                  style={{
                    maxWidth: "100%",
                    marginTop: "1rem",
                    borderRadius: "6px",
                  }}
                />
              )}

              <p style={{ marginTop: "0.75rem" }}>{post.text}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
