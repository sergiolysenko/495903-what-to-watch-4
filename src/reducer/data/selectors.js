import NameSpace from "../name-space.js";

export const getMovies = (state) => {
  return state[NameSpace.DATA].allMovies;
};

export const getMainMovie = (state) => {
  return state[NameSpace.DATA].mainCard;
};
