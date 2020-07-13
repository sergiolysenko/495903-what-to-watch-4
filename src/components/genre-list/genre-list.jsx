import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {MAX_GENRE_LIST, movieShape} from "../utils/constants.js";
import {getGenreList} from "../utils/utils.js";
import {ActionCreator} from "./../../reducer.js";

const GenreList = (props) => {
  const {allMovies, genre, onClick} = props;
  const genreList = Array.from(getGenreList(allMovies));
  const maxGenreList = genreList.slice(0, MAX_GENRE_LIST);
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

const mapStateToProps = (state) => ({
  genre: state.genre,
  allMovies: state.allMovies,
});

const mapDispatchToProps = (dispatch) => ({
  onClick(genre) {
    dispatch(ActionCreator.changeGenre(genre));
    dispatch(ActionCreator.filteredMovies(genre));
  }
});

GenreList.propTypes = {
  genre: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  allMovies: PropTypes.arrayOf(movieShape).isRequired,
};

export {GenreList};
export default connect(mapStateToProps, mapDispatchToProps)(GenreList);
