import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const onMovieClick = () => {};

const TestSettings = {
  MAIN_CARD_TITLE: `The Grand Budapest Hotel`,
  MAIN_CARD_GENRE: `Drama`,
  MAIN_CARD_YEAR: 2014,
};

const movies = [
  {
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    cardImg: `../../img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
    genre: `Drama`,
    year: 2014,
    backgroundImg: `img/bg-the-grand-budapest-hotel.jpg`,
    posterImg: `img/the-grand-budapest-hotel-poster.jpg`,
    rating: `8,9`,
    ratingCount: 240,
    description: `finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
  },
  {
    title: `Bohemian Rhapsody`,
    cardImg: `../../img/bohemian-rhapsody.jpg`,
    genre: `Drama`,
    year: 2000,
    backgroundImg: `img/bg-the-grand-budapest-hotel.jpg`,
    posterImg: `img/the-grand-budapest-hotel-poster.jpg`,
    rating: `8,9`,
    ratingCount: 240,
    description: `Zero, a junior lobby boy, becomes Gustave's `,
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
  },
  {
    title: `Macbeth`,
    cardImg: `../../img/macbeth.jpg`,
    genre: `Drama`,
    year: 2002,
    backgroundImg: `img/bg-the-grand-budapest-hotel.jpg`,
    posterImg: `img/the-grand-budapest-hotel-poster.jpg`,
    rating: `8,9`,
    ratingCount: 240,
    description: `In When of a priceless painting and the chief suspect in her murder.`,
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
  },
  {
    title: `Aviator`,
    cardImg: `../../img/aviator.jpg`,
    genre: `Comedy`,
    year: 1988,
    backgroundImg: `img/bg-the-grand-budapest-hotel.jpg`,
    posterImg: `img/the-grand-budapest-hotel-poster.jpg`,
    rating: `5`,
    ratingCount: 188,
    description: `In the 1930s, the Grand Budapest chief suspect in her murder.`,
    director: `Leo Dicaprio`,
    starring: [`Bill Billy`, `Edward Smith`, `Jude Musk`, `Willem Dafoe`],
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
  },
  {
    title: `What We Do in the Shadows`,
    cardImg: `../../img/what-we-do-in-the-shadows.jpg`,
    genre: `Drama`,
    year: 2014,
    backgroundImg: `img/bg-the-grand-budapest-hotel.jpg`,
    posterImg: `img/the-grand-budapest-hotel-poster.jpg`,
    rating: `8,9`,
    ratingCount: 240,
    description: `In the 1930s, the Grand Budapest Hotel is `,
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
  },
  {
    title: `Revenant`,
    cardImg: `../../img/revenant.jpg`,
    genre: `Drama`,
    year: 2014,
    backgroundImg: `img/bg-the-grand-budapest-hotel.jpg`,
    posterImg: `img/the-grand-budapest-hotel-poster.jpg`,
    rating: `8,9`,
    ratingCount: 240,
    description: `chief suspect in her murder.`,
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
  },
  {
    title: `Johnny English`,
    cardImg: `../../img/johnny-english.jpg`,
    genre: `Drama`,
    year: 2014,
    backgroundImg: `img/bg-the-grand-budapest-hotel.jpg`,
    posterImg: `img/the-grand-budapest-hotel-poster.jpg`,
    rating: `8,9`,
    ratingCount: 240,
    description: `Gustave finds himself the recipient of a priceless painting and the chief suspect in her murder.`,
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
  },
  {
    title: `Pulp Fiction`,
    cardImg: `../../img/pulp-fiction.jpg`,
    genre: `Drama`,
    year: 2014,
    backgroundImg: `img/bg-the-grand-budapest-hotel.jpg`,
    posterImg: `img/the-grand-budapest-hotel-poster.jpg`,
    rating: `8,9`,
    ratingCount: 240,
    description: `In the 1930s`,
    director: `Wes Andreson`,
    starring: [`Bill Murray`, `Edward Norton`, `Jude Law`, `Willem Dafoe`],
    preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`
  },
];

it(`Render Main`, () => {
  const tree = renderer
    .create(<Main
      mainCardTitle={TestSettings.MAIN_CARD_TITLE}
      mainCardGenre={TestSettings.MAIN_CARD_GENRE}
      mainCardYear={TestSettings.MAIN_CARD_YEAR}
      movies={movies}
      onMovieClick={onMovieClick}
    />, {
      createNodeMock: () => {
        return {};
      }
    }).toJSON();

  expect(tree).toMatchSnapshot();
});
