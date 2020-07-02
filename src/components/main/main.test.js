import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const onMovieTitleClick = () => {};

const TestSettings = {
  MAIN_CARD_TITLE: `The Grand Budapest Hotel`,
  MAIN_CARD_GENRE: `Drama`,
  MAIN_CARD_YEAR: 2014,
};

const movies = [
  {
    title: `Fantastic Beasts: The Crimes of Grindelwald`,
    src: `../../img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  },
  {
    title: `Bohemian Rhapsody`,
    src: `../../img/bohemian-rhapsody.jpg`,
  },
  {
    title: `Macbeth`,
    src: `../../img/macbeth.jpg`,
  },
  {
    title: `Aviator`,
    src: `../../img/aviator.jpg`,
  },
  {
    title: `What We Do in the Shadows`,
    src: `../../img/what-we-do-in-the-shadows.jpg`,
  },
  {
    title: `Revenant`,
    src: `../../img/revenant.jpg`,
  },
  {
    title: `Johnny English`,
    src: `../../img/johnny-english.jpg`,
  },
  {
    title: `Pulp Fiction`,
    src: `../../img/pulp-fiction.jpg`,
  },
];

it(`Render Main`, () => {
  const tree = renderer
    .create(<Main
      mainCardTitle={TestSettings.MAIN_CARD_TITLE}
      mainCardGenre={TestSettings.MAIN_CARD_GENRE}
      mainCardYear={TestSettings.MAIN_CARD_YEAR}
      movies={movies}
      onMovieTitleClick={onMovieTitleClick}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
