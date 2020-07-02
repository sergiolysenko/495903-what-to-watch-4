import React from "react";
import renderer from "react-test-renderer";
import MoviesList from "./movies-list.jsx";

const onTitleClick = () => {};

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
  }
];

it(`Render SmallMovieCard`, () => {
  const tree = renderer
    .create(<MoviesList
      movies={movies}
      onTitleClick={onTitleClick}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
