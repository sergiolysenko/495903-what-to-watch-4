import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Operation} from "../../reducer/data/data.js";
import PropTypes from "prop-types";

class MyListButton extends PureComponent {
  constructor(props) {
    super(props);

    this.handleMyListClick = this.handleMyListClick.bind(this);
  }

  handleMyListClick() {
    const {movie, onMyListClick} = this.props;
    const {isFavorite, id} = movie;

    onMyListClick(id, isFavorite);
  }

  render() {
    const {movie} = this.props;

    const myListIcon = movie.isFavorite ?
      <svg viewBox="0 0 18 14" width="18" height="14"><use xlinkHref="#in-list"></use></svg> :
      <svg viewBox="0 0 19 20" width="19" height="20"><use xlinkHref="#add"/></svg>;

    return <button
      className="btn btn--list movie-card__button"
      type="button"
      onClick={this.handleMyListClick}
    >
      {myListIcon}
      <span>My list</span>
    </button>;
  }
}

MyListButton.propTypes = {
  movie: PropTypes.object,
  onMyListClick: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  onMyListClick(movieId, isFavorite) {
    dispatch(Operation.changeFlagIsFavorite(movieId, isFavorite));
  }
});

export {MyListButton};
export default connect(null, mapDispatchToProps)(MyListButton);
