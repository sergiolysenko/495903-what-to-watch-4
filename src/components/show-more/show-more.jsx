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

const mapStateToProps = (state, props) => {
  const {movies} = props;
  const {showingMoviesCount} = state;
  const isButtonDisplayed = movies.length >= showingMoviesCount ? true : false;

  return {
    isButtonDisplayed
  };
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
export default connect(mapStateToProps, mapDispatchToProps)(ShowMore);

