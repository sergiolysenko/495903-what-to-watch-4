import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {MAX_GENRE_LIST} from "../utils/constants.js";
import {getGenreList} from "../utils/utils.js";
import {ActionCreator} from "./../../reducer.js";

const GenreList = (props) => {
  const {genre, maxGenreList, onClick} = props;

  return (
    <React.Fragment>
      <ul className="catalog__genres-list">
        {maxGenreList.map((genreListName, i) => {
          return (
            <li
              key={genreListName + i}
              className={`catalog__genres-item ${genre === genreListName ? `catalog__genres-item--active` : ``}`}
              onClick={(evt) => {
                evt.preventDefault();
                onClick(genreListName);
              }
              }
            >
              <a href="#" className="catalog__genres-link">{genreListName}</a>
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const {genre, allMovies} = state;

  const maxGenreList = Array.from(getGenreList(allMovies)).slice(0, MAX_GENRE_LIST);

  return {
    maxGenreList,
    genre
  };
};

const mapDispatchToProps = (dispatch) => ({
  onClick(genre) {
    dispatch(ActionCreator.changeGenre(genre));
    dispatch(ActionCreator.resetMoviesCount());
  }
});

GenreList.propTypes = {
  maxGenreList: PropTypes.array.isRequired,
  genre: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export {GenreList};
export default connect(mapStateToProps, mapDispatchToProps)(GenreList);
