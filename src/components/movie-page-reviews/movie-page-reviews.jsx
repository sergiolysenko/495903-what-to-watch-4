import React from "react";
import {movieShape, commentsShape} from "../utils/constants.js";

const MoviePageReviews = (props) => {
  const {comments} = props;

  return (
    comments.map((comment, i) => {
      return (
        <div
          key={comment.id + i}
          className="movie-card__reviews movie-card__row">
          <div className="movie-card__reviews-col">
            <div className="review">
              <blockquote className="review__quote">
                <p className="review__text">{comment.comment}</p>

                <footer className="review__details">
                  <cite className="review__author">{comment.user.name}</cite>
                  <time className="review__date" dateTime="2016-12-24">{comment.date}</time>
                </footer>
              </blockquote>

              <div className="review__rating">{comment.rating}</div>
            </div>
          </div>
        </div>
      );
    })
  );
};

MoviePageReviews.propTypes = {
  movie: movieShape.isRequired,
  comments: commentsShape,
};

export default MoviePageReviews;
