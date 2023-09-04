import React from "react";

import Promo from "./Promo/Promo";
import AboutProject from "./AboutProject/AboutProject";
import Techs from "./Techs/Techs";
import AboutMe from "./AboutMe/AboutMe";
import Portfolio from "./Portfolio/Portfolio";
import Footer from "../Footer/Footer";
import NavTab from "../Main/NavTab/NavTab";

function Main(loggedIn) {
  return (
    <>
      {loggedIn ? null : <NavTab />}
      <main className="main">
        <Promo />
        <AboutProject />
        <Techs />
        <div className="main__container">
          <AboutMe />
          <Portfolio />
        </div>

        <Footer />
      </main>
    </>
  );
}

export default Main;
