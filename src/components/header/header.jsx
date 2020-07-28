import React from "react";
import PropTypes from "prop-types";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {Link} from "react-router-dom";
import {AppRoute} from "../utils/constants.js";

const Header = (props) => {
  const {authorizationStatus, children} = props;

  const userBlock = authorizationStatus === AuthorizationStatus.AUTH ?
    <div className="user-block">
      <div className="user-block__avatar">
        <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
      </div>
    </div> :
    <Link
      to={AppRoute.LOGIN}
      className="user-block__link">
      Sign in
    </Link>;

  return <header className="page-header movie-card__head">
    <div className="logo">
      <a className="logo__link">
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </a>
    </div>
    {children}
    {userBlock}
  </header>;
};

Header.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export {Header};
