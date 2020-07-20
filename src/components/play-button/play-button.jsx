import React from "react";
import PropTypes from "prop-types";

const PlayButton = (props) => {
  const {onPlayClick} = props;

  return (
    <button
      onClick={() => onPlayClick()}
      className="btn btn--play movie-card__button"
      type="button">
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </button>
  );
};

PlayButton.propTypes = {
  onPlayClick: PropTypes.func.isRequired,
};

export default PlayButton;
