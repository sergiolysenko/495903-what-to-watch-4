import React from "react";
import renderer from "react-test-renderer";
import {MoviesList} from "./movies-list.jsx";
import {Router} from "react-router-dom";
import history from "./../../history.js";

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
    description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege. Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`, `Tony Revoloru`, `Tilda Swinton`, `Tom Wilkinson`, `Owen Wilkinson`, `Adrien Brody`, `Ralph Fiennes`, `Jeff Goldblum`],
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
    rating: 2,
    ratingCount: 240,
    description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege. Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`, `Tony Revoloru`, `Tilda Swinton`, `Tom Wilkinson`, `Owen Wilkinson`, `Adrien Brody`, `Ralph Fiennes`, `Jeff Goldblum`],
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
    rating: 4,
    ratingCount: 240,
    description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege. Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`, `Tony Revoloru`, `Tilda Swinton`, `Tom Wilkinson`, `Owen Wilkinson`, `Adrien Brody`, `Ralph Fiennes`, `Jeff Goldblum`],
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
    rating: 3,
    ratingCount: 188,
    description: `In the 1930s, the Grand Budapest Hotel is a popular European ski resort, presided over by concierge Gustave H. (Ralph Fiennes). Zero, a junior lobby boy, becomes Gustave's friend and protege. Gustave prides himself on providing first-class service to the hotel's guests, including satisfying the sexual needs of the many elderly women who stay there. When one of Gustave's lovers dies mysteriously, Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
    director: `Leo Dicaprio`,
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`, `Saoirse Ronan`, `Tony Revoloru`, `Tilda Swinton`, `Tom Wilkinson`, `Owen Wilkinson`, `Adrien Brody`, `Ralph Fiennes`, `Jeff Goldblum`],
    preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
    runTime: 188,
    videoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  },
];

it(`Render MoviesList`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <MoviesList
            movies={movies}
          />
        </Router>, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
