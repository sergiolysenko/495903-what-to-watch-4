import React from "react";
import renderer from "react-test-renderer";
import SmallMovieCard from "./small-movie-card.jsx";

it(`Render SmallMovieCard`, () => {
  const tree = renderer
    .create(<SmallMovieCard
      title={`Fantastic Beasts`}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
