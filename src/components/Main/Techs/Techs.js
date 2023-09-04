import "./Techs.css";
import "../Info/Info.css";

function Techs() {
  return (
    <section className="techs">
      <div className="info">
        <h2 className="info__heading">Технологии</h2>
        <span className="info__line"></span>
      </div>
      <div className="techs__container">
        <h2 className="techs__heading">7 технологий</h2>
        <p className="techs__subtitle">
          На курсе веб-разработки мы освоили технологии, которые применили в
          дипломном проекте.
        </p>

        <ul className="techs__list">
          <li className="techs__list-paragraph">HTML</li>
          <li className="techs__list-paragraph">CSS</li>
          <li className="techs__list-paragraph">JS</li>
          <li className="techs__list-paragraph">React</li>
          <li className="techs__list-paragraph">Git</li>
          <li className="techs__list-paragraph">Express.js</li>
          <li className="techs__list-paragraph">mongoDB</li>
        </ul>
      </div>
    </section>
  );
}

export default Techs;
