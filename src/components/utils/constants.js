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

export const movieShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  cardImg: PropTypes.string.isRequired,
  genre: PropTypes.string.isRequired,
  year: PropTypes.number.isRequired,
  backgroundImg: PropTypes.string.isRequired,
  posterImg: PropTypes.string.isRequired,
  rating: PropTypes.string.isRequired,
  ratingCount: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  director: PropTypes.string.isRequired,
  starring: PropTypes.arrayOf(PropTypes.string).isRequired,
  runTime: PropTypes.number.isRequired,
  preview: PropTypes.string.isRequired,
  videoLink: PropTypes.string.isRequired,
});
