import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import NameSpace from "../../reducer/name-space.js";
import {AddReview} from "./add-review.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";

const mockStore = configureStore([]);

const movies = [
  {
    id: 1,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    cardImg: `../../img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    genre: `Drama`,
    year: 2014,
    backgroundImg: `img/bg-the-grand-budapest-hotel.jpg`,
    posterImg: `img/the-grand-budapest-hotel-poster.jpg`,
    rating: 5,
    ratingCount: 40,
    description: `In the `,
    director: `Wes Andreson`,
    starring: [`Bill`, `Jeff Goldblum`],
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    videoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    runTime: 125
  }, {
    id: 1,
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    cardImg: `../../img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    genre: `Drama`,
    year: 2014,
    backgroundImg: `img/bg-the-grand-budapest-hotel.jpg`,
    posterImg: `img/the-grand-budapest-hotel-poster.jpg`,
    rating: 5,
    ratingCount: 40,
    description: `In the `,
    director: `Wes Andreson`,
    starring: [`Bill`, `Jeff Goldblum`],
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    videoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    runTime: 125
  }];
const mockFunc = () => {};
const authorizationStatus = `AUTH`;
const historyProps = {
  match: {
    params: {id: 1}
  }
};
it(`Render AddReview`, () => {
  const store = mockStore({
    [NameSpace.APP_STATE]: {
      genre: `All genres`,
      showingMoviesCount: 8,
      isSendingCommentData: false,
      postingError: false,
    },
    [NameSpace.DATA]: {
      allMovies: movies,
      mainCard: movies[0],
    },
    [NameSpace.USER]: {
      authorizationStatus,
    },
  });

  const tree = renderer
    .create(
        <Provider store={store}>
          <Router history={history}>
            <AddReview
              movie={movies[0]}
              onSubmit={mockFunc}
              isAuthorised={true}
              isSendingCommentData={false}
              isPostingError={false}
              historyProps={historyProps}
            />
          </Router>
        </Provider>, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
