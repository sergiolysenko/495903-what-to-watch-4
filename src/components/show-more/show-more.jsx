import React from "react";
import PropTypes from "prop-types";

const ShowMore = (props) => {
  const {onClick} = props;

  return (
    <div className="catalog__more">
      <button
        onClick={onClick}
        className="catalog__button"
        type="button">Show more</button>
    </div>
  );
};

ShowMore.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export {ShowMore};
