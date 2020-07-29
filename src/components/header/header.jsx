import React from "react";
import PropTypes from "prop-types";

const Header = (props) => {
  const {isAuthorised, children} = props;

  const userBlock = isAuthorised ?
    <div className="user-block">
      <div className="user-block__avatar">
        <img src="img/avatar.jpg" alt="User avatar" width="63" height="63" />
      </div>
    </div> :
    <a className="user-block">
      Sing in
    </a>;

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
  isAuthorised: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

export {Header};
