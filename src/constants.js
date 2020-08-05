import PropTypes from "prop-types";

export const VideoPreview = {
  IS_MUTED: true,
  WIDTH: 280,
  HEIGHT: 175,
  INTERVAL: 1000
};

export const MoviePages = {
  OVERVIEW: `Overview`,
  DETAILS: `Details`,
  REVIEWS: `Reviews`,
};

export const Genres = {
  ALL: `All genres`,
  COMEDIES: `Comedies`,
  CRIME: `Crime`,
  DOCUMENTARY: `Documentary`,
  DRAMA: `Drama`,
  HORROR: `Horror`,
  KIDS_FAMILY: `Kids & Family`,
  ROMANCE: `Romance`,
  SCI_FI: `Sci-Fi`,
  THRILLERS: `Thrillers`,
};

export const SIMILAR_MOVIES_COUNT = 4;
export const SHOWING_MOVIES_COUNT_ON_START = 8;
export const SHOWING_MOVIES_COUNT_BY_BUTTON = 8;

export const MAX_GENRE_LIST = 10;

export const ReviewLength = {
  MIN: 50,
  MAX: 400,
};

export const AppRoute = {
  ROOT: `/`,
  LOGIN: `/login`,
  MY_LIST: `/mylist`,
  FILM: `/films/:id`,
  REVIEW: `/films/:id/review`,
  PLAYER: `/films/player/:id`,
};


export const FavoriteStatus = {
  REMOVE: 0,
  ADD: 1,
};

export const movieShape = PropTypes.shape({
  id: PropTypes.number,
  title: PropTypes.string,
  cardImg: PropTypes.string,
  genre: PropTypes.string,
  year: PropTypes.number,
  backgroundImg: PropTypes.string,
  posterImg: PropTypes.string,
  rating: PropTypes.number,
  ratingCount: PropTypes.number,
  description: PropTypes.string,
  director: PropTypes.string,
  starring: PropTypes.arrayOf(PropTypes.string),
  runTime: PropTypes.number,
  preview: PropTypes.string,
  videoLink: PropTypes.string,
});

export const commentsShape = PropTypes.arrayOf(PropTypes.shape({
  id: PropTypes.number,
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
  }),
  rating: PropTypes.number,
  comment: PropTypes.string,
  date: PropTypes.string,
}));
