import React from "react";
import renderer from "react-test-renderer";
import SmallMovieCard from "./small-movie-card.jsx";

const onTitleClick = () => {};
const onHover = () => {};

const movie = {
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  src: `../../img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
};

it(`Render SmallMovieCard`, () => {
  const tree = renderer
    .create(<SmallMovieCard
      movie={movie}
      onTitleClick={onTitleClick}
      onHover={onHover}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
