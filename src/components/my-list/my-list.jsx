import React, {PureComponent} from "react";
import {Header} from "./../header/header.jsx";
import MoviesList from "../movies-list/movies-list.jsx";
import {connect} from "react-redux";
import {Operation} from "../../reducer/data/data";
import {getFavoriteMovies} from "../../reducer/data/selectors";
import PropTypes from "prop-types";
import {movieShape} from "../utils/constants.js";
import Footer from "../footer/footer.jsx";

class MyList extends PureComponent {
  constructor(props) {
    super(props);

  }

  componentDidMount() {
    const {onLoad} = this.props;
    onLoad();
  }

  render() {
    const {movies} = this.props;

    return <div className="user-page">
      <Header
        isAuthorised={true}
        className="user-page__head"
        isUserLinkActive={false}
      >
        <h1 className="page-title user-page__title">My list</h1>
      </Header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>


        <MoviesList
          movies={movies}
        />
      </section>
      <Footer />
    </div>;
  }

}

MyList.propTypes = {
  onLoad: PropTypes.func.isRequired,
  movies: PropTypes.arrayOf(movieShape),
};

const mapStateToProps = (state) => {
  let movies = getFavoriteMovies(state);

  return {
    movies
  };
};

const mapDispatchToProps = (dispatch) => ({
  onLoad() {
    dispatch(Operation.loadFavoriteMovies());
  }
});

export {MyList};
export default connect(mapStateToProps, mapDispatchToProps)(MyList);
