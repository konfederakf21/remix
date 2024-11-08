/**
 * Single cake offer
 * @param {string} img - Foto dortu
 * @param {string} title - Název dortu
 * @param {string} price - Cena dortu, v Kč
 */

export default function Cake({ img, title, price }) {
  return (
    <article>
      <img
        src={img}
        alt={title}
        width={300}
      />
      <h1>{title}</h1>
      <p>{price} Kč</p>
    </article>
  );
}
