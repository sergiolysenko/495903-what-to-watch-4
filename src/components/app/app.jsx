import React from "react";
import Main from "../main/main.jsx";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import MoviePage from "../movie-page/movie-page.jsx";
import {findMovieById} from "../utils/utils.js";

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      selectedMovie: null,
    };

    this.handleCardClick = this.handleCardClick.bind(this);
  }

  renderApp() {
    const {mainCardTitle, mainCardGenre, mainCardYear, movies} = this.props;

    if (this.state.selectedMovie === null) {
      return (
        <Main
          mainCardTitle={mainCardTitle}
          mainCardGenre={mainCardGenre}
          mainCardYear={mainCardYear}
          movies={movies}
          onMovieClick={this.handleCardClick}
        />);
    }
    const chosenMovie = findMovieById(movies, this.state.selectedMovie);
    return (<MoviePage movie={chosenMovie}/>);
  }

  handleCardClick(id) {
    this.setState({
      selectedMovie: id,
    });
  }

  render() {
    const {movies} = this.props;
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this.renderApp()}
          </Route>
          <Route exact path="/movie-page">
            <MoviePage movie={movies[0]}/>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  mainCardTitle: PropTypes.string.isRequired,
  mainCardGenre: PropTypes.string.isRequired,
  mainCardYear: PropTypes.number.isRequired,
  movies: PropTypes.arrayOf(PropTypes.shape({
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
    preview: PropTypes.string.isRequired,
    runTime: PropTypes.number.isRequired,
  })).isRequired,
};

export default App;
