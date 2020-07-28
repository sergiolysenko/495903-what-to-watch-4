import React from "react";
import renderer from "react-test-renderer";
import {AddReview} from "./add-review.jsx";

const movie = {
  id: 1,
  title: `Fantastic Beasts: The Crimes of Grindelwald`,
  cardImg: `../../img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
  genre: `Drama`,
  year: 2014,
  backgroundImg: `img/bg-the-grand-budapest-hotel.jpg`,
  posterImg: `img/the-grand-budapest-hotel-poster.jpg`,
  rating: 5,
  ratingCount: 40,
  description: `In the `,
  director: `Wes Andreson`,
  starring: [`Bill`, `Jeff Goldblum`],
  preview: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  videoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
  runTime: 125
};
const mockFucnc = () => {};
const authorizationStatus = `AUTH`;

it(`Render AddReview`, () => {
  const tree = renderer
    .create(
        <AddReview
          movie={movie}
          onSubmit={mockFucnc}
          authorizationStatus={authorizationStatus}
          isPostingComment={false}
          isPostingError={false}
        />, {
          createNodeMock: () => {
            return {};
          }
        }).toJSON();

  expect(tree).toMatchSnapshot();
});
