import React from "react";
import PropTypes from "prop-types";
import {getMovieReviews} from "../utils/utils.js";

const MoviePageReviews = (props) => {
  const {movie, reviews} = props;
  const reviewsList = getMovieReviews(movie.id, reviews);
  if (!reviewsList) {
    return null;
  }
  return (
    reviewsList.map((review, i) => {
      return (
        <div
          key={review.id + i}
          className="movie-card__reviews movie-card__row">
          <div className="movie-card__reviews-col">
            <div className="review">
              <blockquote className="review__quote">
                <p className="review__text">{review.comment}</p>

                <footer className="review__details">
                  <cite className="review__author">{review.user.name}</cite>
                  <time className="review__date" dateTime="2016-12-24">{review.date}</time>
                </footer>
              </blockquote>

              <div className="review__rating">{review.rating}</div>
            </div>
          </div>
        </div>
      );
    })
  );
};

MoviePageReviews.propTypes = {
  movie: PropTypes.shape({
    id: PropTypes.number.isRequired,
  }),
  reviews: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
    }),
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
  })).isRequired,
};

export default MoviePageReviews;
