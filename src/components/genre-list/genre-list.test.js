import React from "react";
import renderer from "react-test-renderer";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";
import GenreList from "./genre-list.jsx";
import NameSpace from "../../reducer/name-space.js";

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
    rating: 8,
    ratingCount: 40,
    description: `In the 1930s,`,
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`],
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    runTime: 125,
    videoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    id: 2,
    title: `Bohemian Rhapsody`,
    cardImg: `../../img/bohemian-rhapsody.jpg`,
    genre: `Drama`,
    year: 2000,
    backgroundImg: `img/bg-the-grand-budapest-hotel.jpg`,
    posterImg: `img/the-grand-budapest-hotel-poster.jpg`,
    rating: 7,
    ratingCount: 240,
    description: `the chief suspect in her murder.`,
    director: `Wes Andreson`,
    starring: [`Jeff Goldblum`],
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    runTime: 99,
    videoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    id: 3,
    title: `Macbeth`,
    cardImg: `../../img/macbeth.jpg`,
    genre: `Drama`,
    year: 2002,
    backgroundImg: `img/bg-the-grand-budapest-hotel.jpg`,
    posterImg: `img/the-grand-budapest-hotel-poster.jpg`,
    rating: 9,
    ratingCount: 240,
    description: `In tustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
    director: `Wes Andreson`,
    starring: [`Bill Murray`],
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
    runTime: 200,
    videoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
  {
    id: 4,
    title: `Aviator`,
    cardImg: `../../img/aviator.jpg`,
    genre: `Comedy`,
    year: 1988,
    backgroundImg: `img/bg-the-grand-budapest-hotel.jpg`,
    posterImg: `img/the-grand-budapest-hotel-poster.jpg`,
    rating: 7,
    ratingCount: 188,
    description: `In the chief suspect in her murder.`,
    director: `Leo Dicaprio`,
    starring: [`Bill Murray`, `Edward Norton`],
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    runTime: 188,
    videoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
];

it(`Render GenreList`, () => {
  const store = mockStore({
    [NameSpace.APP_STATE]: {
      chosenMovieId: -1,
      genre: `All genres`,
      showingMoviesCount: 8,
      playingMovie: null,
    },
    [NameSpace.DATA]: {
      allMovies: movies,
      mainCard: movies[0],
    },
  });

  const tree = renderer.create(
      <Provider store={store}>
        <GenreList
        />
      </Provider>
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
