import React from "react";
import PropTypes from "prop-types";
import {Link} from "react-router-dom";
import {AppRoute} from "../../constants.js";
import Footer from "../footer/footer.jsx";

class SingIn extends React.PureComponent {
  constructor(props) {
    super(props);

    this.emailRef = React.createRef();
    this.passwordRef = React.createRef();

    this.handleSubmitClick = this.handleSubmitClick.bind(this);
  }

  handleSubmitClick(evt) {
    const {onSingInClick} = this.props;
    evt.preventDefault();

    onSingInClick({
      email: this.emailRef.current.value,
      password: this.passwordRef.current.value,
    });
  }

  render() {
    const {isEmailValid} = this.props;

    return <div className="user-page">
      <header className="page-header user-page__head">
        <Link
          className="logo__link"
          to={AppRoute.ROOT}
        >
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
        <h1 className="page-title user-page__title">Sign in</h1>
      </header>

      <div className="sign-in user-page__content">
        <form action="#" className="sign-in__form">
          {!isEmailValid &&
          <div className="sign-in__message">
            <p>Please enter a valid email address</p>
          </div>}

          <div className="sign-in__fields">
            <div className={`sign-in__field ${!isEmailValid && `sign-in__field--error`}`}>
              <input
                ref={this.emailRef}
                className="sign-in__input" type="email" placeholder="Email address" name="user-email" id="user-email" />
              <label className="sign-in__label visually-hidden" htmlFor="user-email">Email address</label>
            </div>
            <div className="sign-in__field">
              <input
                ref={this.passwordRef}
                className="sign-in__input" type="password" placeholder="Password" name="user-password" id="user-password" />
              <label className="sign-in__label visually-hidden" htmlFor="user-password">Password</label>
            </div>
          </div>
          <div className="sign-in__submit">
            <button
              onClick={this.handleSubmitClick}
              className="sign-in__btn"
              type="submit">Sign in</button>
          </div>
        </form>
      </div>

      <Footer/>
    </div>;
  }
}

SingIn.propTypes = {
  onSingInClick: PropTypes.func.isRequired,
  isEmailValid: PropTypes.bool.isRequired,
};

export {SingIn};
