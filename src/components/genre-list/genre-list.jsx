import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {MAX_GENRE_LIST} from "../utils/constants.js";
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
  allMovies: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    year: PropTypes.number.isRequired,
    backgroundImg: PropTypes.string.isRequired,
    posterImg: PropTypes.string.isRequired,
    rating: PropTypes.string.isRequired,
    ratingCount: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    director: PropTypes.string.isRequired,
    starring: PropTypes.arrayOf(PropTypes.string).isRequired,
    preview: PropTypes.string.isRequired,
    runTime: PropTypes.number.isRequired,
  })).isRequired,
};

export {GenreList};
export default connect(mapStateToProps, mapDispatchToProps)(GenreList);
