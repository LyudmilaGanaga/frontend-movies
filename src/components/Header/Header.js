import "./Header.css";
import { Link } from "react-router-dom";

import headerLogo from "../../images/logo.svg";

function Header({ headerNavTab }) {
  return (
    <header className="header">
      <div className="header__containter">
        <Link to="/" className="header__logo">
          <img src={headerLogo} alt="Логотип сайта" />
        </Link>
        {headerNavTab}
      </div>
    </header>
  );
}

export default Header;
