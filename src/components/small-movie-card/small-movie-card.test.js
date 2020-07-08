import React from "react";
import renderer from "react-test-renderer";
import SmallMovieCard from "./small-movie-card.jsx";

const onClick = () => {};
const onHover = () => {};

const movie = {
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
};

it(`Render SmallMovieCard`, () => {
  const tree = renderer
    .create(<SmallMovieCard
      movie={movie}
      onClick={onClick}
      onHover={onHover}
    />, {
      createNodeMock: () => {
        return {};
      }
    })
    .toJSON();

  expect(tree).toMatchSnapshot();
});
