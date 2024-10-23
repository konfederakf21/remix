/**
 * Single car offer
 * @param {string} title - Název auta
 * @param {string} img - Foto auta
 */

export default function Car({ title, img }) {
  return (
    <article>
      <h1>{title}</h1>
      <img
        src={img}
        alt={title}
        width={300}
      />
    </article>
  );
}
