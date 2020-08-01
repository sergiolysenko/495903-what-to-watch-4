import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AppRoute} from "../utils/constants.js";

const Header = (props) => {
  const {isAuthorised, isUserLinkActive = true, isActiveLogoLink = true, uniqueClasses = ``, children} = props;

  const avatar = <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />;

  const logo = <React.Fragment>
    <span className="logo__letter logo__letter--1">W</span>
    <span className="logo__letter logo__letter--2">T</span>
    <span className="logo__letter logo__letter--3">W</span>
  </React.Fragment>;

  const userPic = isUserLinkActive ?
    <div className="user-block__avatar">
      <Link
        to={AppRoute.MY_LIST}>
        {avatar}
      </Link>
    </div> :
    <div className="user-block__avatar">{avatar}</div>
    ;

  const userBlock = isAuthorised ?
    <React.Fragment>
      {userPic}
    </React.Fragment>
    :
    <Link
      to={AppRoute.LOGIN}
      className="user-block__link">
      Sign in
    </Link>;

  const logoLink = isActiveLogoLink ?
    <Link
      className="logo__link"
      to={AppRoute.ROOT}
    >
      {logo}
    </Link> :
    <a className="logo__link">
      {logo}
    </a>;

  return <header className={`page-header ${uniqueClasses}`}>
    <div className="logo">
      {logoLink}
    </div>

    {children}

    <div className="user-block">
      {userBlock}
    </div>
  </header>;
};

Header.propTypes = {
  isAuthorised: PropTypes.bool.isRequired,
  isUserLinkActive: PropTypes.bool,
  isActiveLogoLink: PropTypes.bool,
  uniqueClasses: PropTypes.string,
  children: PropTypes.node,
};

export {Header};
