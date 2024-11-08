/**
 * Single car offer
 * @param {string} title - Název auta
 * @param {string} img - Foto auta
 * @param {string} price - Cena auta, v Kč
 */

export default function Car({ title, img, price }) {
  return (
    <article>
      <h1>{title}</h1>
      <img
        src={img}
        alt={title}
        width={300}
      />
      <p>{price} Kč</p>
    </article>
  );
}
