import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer.js";

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

const mapDispatchToProps = (dispatch) => ({
  onClick() {
    dispatch(ActionCreator.increaseShowingMovies());
  }
});

ShowMore.propTypes = {
  isButtonDisplayed: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export {ShowMore};
export default connect(null, mapDispatchToProps)(ShowMore);

