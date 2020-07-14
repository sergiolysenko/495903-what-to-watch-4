import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {MAX_GENRE_LIST} from "../utils/constants.js";
import {getGenreList} from "../utils/utils.js";
import {ActionCreator} from "./../../reducer.js";

const GenreList = (props) => {
  const {activeGenre, genreList, onClick} = props;

  return (
    <React.Fragment>
      <ul className="catalog__genres-list">
        {genreList.map((genre, i) => {
          return (
            <li
              key={genre + i}
              className={`catalog__genres-item ${activeGenre === genre ? `catalog__genres-item--active` : ``}`}
              onClick={(evt) => {
                evt.preventDefault();
                onClick(genre);
              }
              }
            >
              <a href="#" className="catalog__genres-link">{genre}</a>
            </li>
          );
        })}
      </ul>
    </React.Fragment>
  );
};

const mapStateToProps = (state) => {
  const {genre, allMovies} = state;
  const genreList = Array.from(getGenreList(allMovies)).slice(0, MAX_GENRE_LIST);

  return {
    activeGenre: genre,
    genreList,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onClick(genre) {
    dispatch(ActionCreator.changeGenre(genre));
  }
});

GenreList.propTypes = {
  activeGenre: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  genreList: PropTypes.array.isRequired,
};

export {GenreList};
export default connect(mapStateToProps, mapDispatchToProps)(GenreList);
