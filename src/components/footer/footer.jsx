import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AppRoute} from "../../constants.js";

const Footer = (props) => {
  const {isActiveLogoLink = true} = props;

  const logo = <React.Fragment>
    <span className="logo__letter logo__letter--1">W</span>
    <span className="logo__letter logo__letter--2">T</span>
    <span className="logo__letter logo__letter--3">W</span>
  </React.Fragment>;

  return (
    <footer className="page-footer">
      <div className="logo">
        {isActiveLogoLink ?
          <Link to={AppRoute.ROOT} className="logo__link logo__link--light">
            {logo}
          </Link> :
          <a className="logo__link logo__link--light">
            {logo}
          </a>
        }
      </div>

      <div className="copyright">
        <p>© 2019 What to watch Ltd.</p>
      </div>
    </footer>
  );
};
Footer.propTypes = {
  isActiveLogoLink: PropTypes.bool,
};

export default Footer;
