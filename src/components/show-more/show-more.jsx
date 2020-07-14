import React from "react";
import PropTypes from "prop-types";

const ShowMore = (props) => {
  const {isButtonDisplayed, onClick} = props;

  return (isButtonDisplayed &&
      <div className="catalog__more">
        <button
          onClick={onClick}
          className="catalog__button"
          type="button">Show more</button>
      </div>
  );
};

ShowMore.propTypes = {
  isButtonDisplayed: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export {ShowMore};
