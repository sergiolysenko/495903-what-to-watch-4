import React from "react";
import PropTypes from "prop-types";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import {Link} from "react-router-dom";
import {AppRoute} from "../utils/constants.js";
import Logo from "../logo/logo.jsx";

const Header = (props) => {
  const {authorizationStatus, children} = props;

  const userBlock = authorizationStatus === AuthorizationStatus.AUTH ?
    <div className="user-block__avatar">
      <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
    </div>
    :
    <Link
      to={AppRoute.LOGIN}
      className="user-block__link">
      Sign in
    </Link>;

  return <header className="page-header movie-card__head">
    <Logo />
    {children}
    <div className="user-block">
      {userBlock}
    </div>
  </header>;
};

Header.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  children: PropTypes.node,
};

export {Header};
