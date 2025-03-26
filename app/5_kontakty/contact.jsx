/**
 * Single car offer
 * @param {string} name - Jméno
 * @param {string} name2 - Příjmení
 * @param {string} mail - Mail
 * @param {string} date - Datum narození
 */

export default function Contact({ name, name2, mail, date }) {
  return (
    <article>
      <h1>
        {name} {name2}
      </h1>
      <p>{mail}</p>
      <p>{date}</p>
    </article>
  );
}
