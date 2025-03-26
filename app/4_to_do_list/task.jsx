/**
 * @param {string} title - Název věci
 * @param {string} deadline - Datum
 */

export default function Do({ title, deadline }) {
  return (
    <article>
      <section>
        <h1>{title}</h1>
        <p>{deadline} Kč</p>
      </section>
    </article>
  );
}
