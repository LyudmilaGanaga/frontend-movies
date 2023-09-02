import "./AboutProject.css";
import Info from "../Info/Info";
import "../Info/Info.css";

function AboutProject() {
  return (
    <Info
      infoHeading={"О проекте"}
      infoLine={
        <>
          <section className="aboutProject">
            <div className="aboutProject__container">
              <h3 className="aboutProject__heading">
                Дипломный проект включал 5 этапов
              </h3>
              <h3 className="aboutProject__heading">
                На выполнение диплома ушло 5 недель
              </h3>
              <p className="aboutProject__paragraph">
                Составление плана, работу над бэкендом, вёрстку, добавление
                функциональности и финальные доработки.
              </p>
              <p className="aboutProject__paragraph">
                У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
                соблюдать, чтобы успешно защититься.
              </p>
            </div>

            <div className="aboutProject__deadlines">
              <p className="aboutProject__deadlines-time">1 неделя</p>
              <p className="aboutProject__deadlines-time">4 недели</p>
              <p className="aboutProject__deadlines-name">Back-end</p>
              <p className="aboutProject__deadlines-name">Front-end</p>
            </div>
          </section>
        </>
      }
    />
  );
}

export default AboutProject;
