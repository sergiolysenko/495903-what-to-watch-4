import PropTypes from "prop-types";

const VideoPreview = {
  IS_MUTED: true,
  WIDTH: 280,
  HEIGHT: 175,
  INTERVAL: 1000
};

const MoviePages = {
  OVERVIEW: `Overview`,
  DETAILS: `Details`,
  REVIEWS: `Reviews`,
};

const Genres = {
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

const SIMILAR_MOVIES_COUNT = 4;
const SHOWING_MOVIES_COUNT_ON_START = 8;
const SHOWING_MOVIES_COUNT_BY_BUTTON = 8;

const MAX_GENRE_LIST = 10;

const movieShape = PropTypes.shape({
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
  runTime: PropTypes.number.isRequired,
});

export {VideoPreview, MoviePages, SIMILAR_MOVIES_COUNT, Genres, MAX_GENRE_LIST, movieShape, SHOWING_MOVIES_COUNT_BY_BUTTON, SHOWING_MOVIES_COUNT_ON_START};
