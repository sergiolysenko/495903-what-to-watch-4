import {extend} from "../src/components/utils/utils.js";
import {Genres} from "../src/components/utils/constants.js";
import {movies} from "../src/mocks/movies.js";

const initialState = {
  genre: Genres.ALL,
  movies,
};

const ActionType = {
  CHANGE_GENRE: `CHANGE_GENRE`,
  FILTERED_MOVIES: `FILTERED_MOVIES`,
};


const getFilteredMovies = (genre) => {
  const allMovies = initialState.movies;

  if (genre === Genres.ALL) {
    return allMovies;
  }

  if (!allMovies) {
    return [];
  }

  return allMovies.filter((movie) => movie.genre === genre);
};

const ActionCreator = {
  changeGenre: (genre) => ({
    type: ActionType.CHANGE_GENRE,
    payload: genre,
  }),
  filteredMovies: (genre) => ({
    type: ActionType.FILTERED_MOVIES,
    payload: getFilteredMovies(genre),
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_GENRE:
      return extend(state, {
        genre: action.payload,
      });
    case ActionType.FILTERED_MOVIES:
      return extend(state, {
        movies: action.payload,
      });
  }
  return state;
};
export {ActionCreator, ActionType, reducer};
