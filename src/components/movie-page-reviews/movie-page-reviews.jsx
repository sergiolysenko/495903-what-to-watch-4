import React from "react";
import PropTypes from "prop-types";
import {commentsShape} from "../../constants.js";
import {connect} from "react-redux";
import {getComments} from "../../reducer/data/selectors.js";
import {Operation as DataOperation} from "../../reducer/data/data.js";

const options = {
  year: `numeric`,
  month: `long`,
  day: `numeric`,
};

class MoviePageReviews extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {onLoad, movieId} = this.props;
    onLoad(movieId);
  }

  render() {
    const {comments} = this.props;

    if (!comments) {
      return null;
    }

    return (
      comments.map((userComment, i) => {
        const {id, comment, user, date, rating} = userComment;

        const reviewDate = new Date(date).toLocaleString(`en-US`, options);
        const dateTime = date.substr(0, 10);
        return (
          <div
            key={id + i}
            className="movie-card__reviews movie-card__row">
            <div className="movie-card__reviews-col">
              <div className="review">
                <blockquote className="review__quote">
                  <p className="review__text">{comment}</p>

                  <footer className="review__details">
                    <cite className="review__author">{user.name}</cite>
                    <time className="review__date" dateTime={dateTime}>{reviewDate}</time>
                  </footer>
                </blockquote>

                <div className="review__rating">{rating}</div>
              </div>
            </div>
          </div>
        );
      })
    );
  }
}

const mapStateToProps = (state) => ({
  comments: getComments(state),
});

const mapDispatchToProps = (dispatch) => ({
  onLoad(movieId) {
    dispatch(DataOperation.loadComments(movieId));
  },
});

MoviePageReviews.propTypes = {
  onLoad: PropTypes.func.isRequired,
  movieId: PropTypes.number.isRequired,
  comments: commentsShape,
};
export {MoviePageReviews};
export default connect(mapStateToProps, mapDispatchToProps)(MoviePageReviews);
