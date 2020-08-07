import React, {PureComponent} from "react";
import {connect} from "react-redux";
import {Operation} from "../../reducer/data/data.js";
import {getMainMovie} from "../../reducer/data/selectors.js";
import PropTypes from "prop-types";

class MyListButton extends PureComponent {
  constructor(props) {
    super(props);

    this.handleMyListClick = this.handleMyListClick.bind(this);
  }

  handleMyListClick() {
    const {movie, onMyListClick, isMainCardUpdate} = this.props;
    const {isFavorite, id} = movie;

    onMyListClick(id, isFavorite, isMainCardUpdate);
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
  isMainCardUpdate: PropTypes.bool.isRequired,
};

const mapStateToProps = (state, props) => {
  const {movie} = props;
  const mainCard = getMainMovie(state);
  const isMainCardUpdate = mainCard.id === movie.id;
  return {
    isMainCardUpdate,
  };
};

const mapDispatchToProps = (dispatch) => ({
  onMyListClick(movieId, isFavorite, isMainCardUpdate) {
    dispatch(Operation.changeFlagIsFavorite(movieId, isFavorite, isMainCardUpdate));
  }
});

export {MyListButton};
export default connect(mapStateToProps, mapDispatchToProps)(MyListButton);
