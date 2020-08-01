import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AppRoute} from "../utils/constants.js";

const PlayButton = (props) => {
  const {id} = props;

  return (
    <Link
      to={AppRoute.PLAYER.replace(`:id`, id)}
      className="btn btn--play movie-card__button"
      type="button">
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </Link>
  );
};

PlayButton.propTypes = {
  id: PropTypes.number,
};

export default PlayButton;
