import NameSpace from "../name-space.js";

export const getChosenMovieId = (state) => {
  return state[NameSpace.STATE].chosenMovieId;
};

export const getGenre = (state) => {
  return state[NameSpace.STATE].genre;
};

export const getPlayingMovie = (state) => {
  return state[NameSpace.STATE].playingMovie;
};

export const getShowingMoviesCount = (state) => {
  return state[NameSpace.STATE].showingMoviesCount;
};
