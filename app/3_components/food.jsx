import style from "../3_components/food.module.css";
import Form from "./addFood.js";
import "../css/general.css";

/**
 * @param {string} img - Foto jídla
 * @param {string} title - Název jídla
 * @param {string} price - Cena jídla, v Kč
 */

export default function Food({ image, title, price }) {
  return (
    <article className={style.article}>
      <section>
        <img
          src={image}
          alt={title}
          width={300}
        />
      </section>

      <section>
        <h1>{title}</h1>
        <p>{price} Kč</p>
      </section>

      <section>
        <img
          src="data:image/png;base64,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"
          alt="delete"
          width={30}
        />
        <Form
          method="post"
          action="/deleteFood">
          <input
            type=""
            name=""
          />
        </Form>
      </section>
    </article>
  );
}
