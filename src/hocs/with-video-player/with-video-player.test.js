import React from "react";
import renderer from "react-test-renderer";
import {withVideoPlayer} from "./with-video-player.js";
import PropTypes from "prop-types";
const movie = {
  id: 1,
  title: `Aviator`,
  cardImg: `../../img/aviator.jpg`,
  genre: `Comedy`,
  year: 1988,
  backgroundImg: `img/bg-the-grand-budapest-hotel.jpg`,
  posterImg: `img/the-grand-budapest-hotel-poster.jpg`,
  rating: 5,
  ratingCount: 188,
  description: `murder.`,
  director: `Leo Dicaprio`,
  starring: [`Bill Goldblum`],
  preview: `https://upload.wikimedia.org/wikipedia/commons/transcoded/b/b3/Big_Buck_Bunny_Trailer_400p.ogv/Big_Buck_Bunny_Trailer_400p.ogv.360p.webm`,
  runTime: 125,
  videoLink: `https://download.blender.org/durian/trailer/sintel_trailer-480p.mp4`,
};
const MockComponent = (props) => {
  const {children} = props;

  return <div>
    {children}
  </div>;
};

MockComponent.propTypes = {
  children: PropTypes.node.isRequired,
};

const MockComponentWrapped = withVideoPlayer(MockComponent);

it(`render withVideoPlayer`, () => {
  const tree = renderer.create(
      <MockComponentWrapped
        movie={movie}
        id={1}
      />, {
        createNodeMock: () => {
          return {};
        }}
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
