import React from "react";
import PropTypes from "prop-types";
import {ReviewLength} from "../utils/constants.js";
import {movieShape} from "../utils/constants.js";
import {Header} from "../header/header.jsx";

class AddReview extends React.PureComponent {
  constructor(props) {
    super(props);

    this.formRef = React.createRef();
    this.commentRef = React.createRef();
    this.submitRef = React.createRef();

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    const {onSubmit, movie} = this.props;

    const formRef = this.formRef.current;
    const formData = new FormData(formRef);

    evt.preventDefault();
    onSubmit(movie.id, {
      rating: formData.get(`rating`),
      comment: formData.get(`review-text`)
    });
  }

  handleInput() {
    const formRef = this.formRef.current;
    const commentRef = this.commentRef.current;
    const submitRef = this.submitRef.current;
    const isRaitingChecked = Boolean(formRef.rating.value);
    const isFormValid = commentRef.value.length >= ReviewLength.MIN;

    if (isRaitingChecked && isFormValid) {
      submitRef.removeAttribute(`disabled`);
    } else {
      submitRef.setAttribute(`disabled`, `disabled`);
    }
  }

  render() {
    const {movie, authorizationStatus} = this.props;
    const {title, posterImg, backgroundImg, backgroundColor} = movie;

    return (
      <section
        style={{backgroundColor}}
        className="movie-card movie-card--full">
        <div className="movie-card__hero">
          <div className="movie-card__bg">
            <img src={backgroundImg} alt={title} />
          </div>

          <h1 className="visually-hidden">WTW</h1>

          <Header
            authorizationStatus={authorizationStatus}
          >
            <nav className="breadcrumbs">
              <ul className="breadcrumbs__list">
                <li className="breadcrumbs__item">
                  <a href="movie-page.html" className="breadcrumbs__link">{title}</a>
                </li>
                <li className="breadcrumbs__item">
                  <a className="breadcrumbs__link">Add review</a>
                </li>
              </ul>
            </nav>
          </Header>

          <div className="movie-card__poster movie-card__poster--small">
            <img src={posterImg} alt={title + ` poster`} width="218" height="327" />
          </div>
        </div>

        <div className="add-review">
          <form
            onSubmit={(evt) => this.handleSubmit(evt)}
            ref={this.formRef}
            action="#"
            className="add-review__form">
            <div
              onChange={this.handleInput}
              className="rating">
              <div className="rating__stars">
                <input className="rating__input" id="star-1" type="radio" name="rating" value="1"/>
                <label className="rating__label" htmlFor="star-1">Rating 1</label>

                <input className="rating__input" id="star-2" type="radio" name="rating" value="2" />
                <label className="rating__label" htmlFor="star-2">Rating 2</label>

                <input className="rating__input" id="star-3" type="radio" name="rating" value="3"/>
                <label className="rating__label" htmlFor="star-3">Rating 3</label>

                <input className="rating__input" id="star-4" type="radio" name="rating" value="4" />
                <label className="rating__label" htmlFor="star-4">Rating 4</label>

                <input className="rating__input" id="star-5" type="radio" name="rating" value="5" />
                <label className="rating__label" htmlFor="star-5">Rating 5</label>
              </div>
            </div>

            <div className="add-review__text">
              <textarea
                ref={this.commentRef}
                minLength={ReviewLength.MIN}
                maxLength={ReviewLength.MAX}
                onInput={this.handleInput}
                className="add-review__textarea"
                name="review-text"
                id="review-text"
                placeholder="Review text"></textarea>
              <div className="add-review__submit">
                <button
                  ref={this.submitRef}
                  className="add-review__btn"
                  type="submit"
                  disabled={`disabled`}
                >Post</button>
              </div>

            </div>
          </form>
        </div>
      </section>
    );
  }
}

AddReview.propTypes = {
  movie: movieShape,
  onSubmit: PropTypes.func.isRequired,
  authorizationStatus: PropTypes.string,
};

export {AddReview};
