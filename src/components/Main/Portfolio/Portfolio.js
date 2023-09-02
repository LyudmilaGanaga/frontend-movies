import "./Portfolio.css";
import { Link } from "react-router-dom";

function Portfolio() {
  return (
    <section className="portfolio">
      <h3 className="portfolio__heading">Портфолио</h3>
      <ul className="portfolio__container">
        <li className="portfolio__name">
          <Link
            to="https://lyudmilaganaga.github.io/russian-travel/"
            target="_blank"
            className="portfolio__link"
          >
            Статичный сайт
          </Link>
        </li>
        {/* <span className="portfolio__line"></span> */}
        <li className="portfolio__name">
          <Link to="#" target="_blank" className="portfolio__link">
            Адаптивный сайт
          </Link>
        </li>
        {/* <span className="portfolio__line"></span> */}
        <li className="portfolio__name">
          <Link
            to="https://lyudmilaganaga.github.io/mesto-react/"
            target="_blank"
            className="portfolio__link"
          >
            Одностраничное приложение
          </Link>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
