const database = "2it_konfederakf21";
const username = "konfederakf21";
const password = "hqAwBd1xAr";
const server = "localhost";
export async function sql(sql) {
  const url = "http://marcincin.epsilon.spstrutnov.cz/gate.php";
  const postJson = JSON.stringify({
    database: database,
    username: username,
    password: password,
    server: server,
    sql: sql,
  });
  try {
    const response = await fetch(url, { method: "POST", body: postJson });
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json);
    return json;
  } catch (error) {
    console.error(error.message);
  }
}
