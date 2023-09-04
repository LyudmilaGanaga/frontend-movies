import "../Promo/Promo.css";
import headerPictureTop from "../../../images/landingLogo.svg";

function Promo() {
  return (
    <section className="promo">
      <h1 className="promo__heading">
        Учебный проект студента факультета Веб-разработки.
      </h1>
      <img
        className="promo__image"
        src={headerPictureTop}
        alt="Главная картинка"
      />
    </section>
  );
}

export default Promo;
