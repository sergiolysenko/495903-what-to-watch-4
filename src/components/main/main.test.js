import React from "react";
import renderer from "react-test-renderer";
import Main from "./main.jsx";

const onMovieTitleClick = () => {};

const TestSettings = {
  MAIN_CARD_TITLE: `The Grand Budapest Hotel`,
  MAIN_CARD_GENRE: `Drama`,
  MAIN_CARD_YEAR: 2014,
  MOVIES: [`Fantastic Beasts`, `Seven Years in Tibet`],
};

it(`Render Main`, () => {
  const tree = renderer
    .create(<Main
      mainCardTitle={TestSettings.MAIN_CARD_TITLE}
      mainCardGenre={TestSettings.MAIN_CARD_GENRE}
      mainCardYear={TestSettings.MAIN_CARD_YEAR}
      movies={TestSettings.MOVIES}
      onMovieTitleClick={onMovieTitleClick}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
