import React from "react";
import renderer from "react-test-renderer";
import SmallMovieCard from "./small-movie-card.jsx";

const onMovieTitleClick = () => {};
const TestSettings = {
  MOVIE: `Fantastic Beasts`,
};

it(`Render SmallMovieCard`, () => {
  const tree = renderer
    .create(<SmallMovieCard
      movie={TestSettings.MOVIE}
      onMovieTitleClick={onMovieTitleClick}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
