import "./AboutMe.css";
import Info from "../Info/Info";
import "../Info/Info.css";
import photoImg from "../../../images/photo.png";
import { Link } from "react-router-dom";

function AboutMe() {
  return (
    <Info
      infoHeading={"Студент"}
      infoLine={
        <section className="aboutMe">
          <div className="aboutMe__container">
            <h3 className="aboutMe__heading">Виталий</h3>
            <p className="aboutMe__profesion">Фронтенд-разработчик, 30 лет</p>
            <p className="aboutMe__paragraph">
              Я родился и живу в Саратове, закончил факультет экономики СГУ. У
              меня есть жена и дочь. Я люблю слушать музыку, а ещё увлекаюсь
              бегом. Недавно начал кодить. С 2015 года работал в компании «СКБ
              Контур». После того, как прошёл курс по веб-разработке, начал
              заниматься фриланс-заказами и ушёл с постоянной работы.
            </p>
            <Link
              to="https://github.com/LyudmilaGanaga"
              target="_blank"
              className="aboutMe__link"
            >
              Github
            </Link>
          </div>
          <img
            className="aboutMe__img"
            src={photoImg}
            alt="Фотография студента"
          />
        </section>
      }
    />
  );
}

export default AboutMe;
