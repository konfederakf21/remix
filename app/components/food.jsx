import style from "../components/food.module.css";

/**
 * @param {string} img - Foto jídla
 * @param {string} title - Název jídla
 * @param {string} price - Cena jídla, v Kč
 */

export default function Food({ img, title, price }) {
  return (
    <article className={style.article}>
      <section>
        <img
          src={img}
          alt={title}
          width={300}
        />
      </section>
      <section>
        <h1>{title}</h1>
        <p>{price} Kč</p>
      </section>
    </article>
  );
}
