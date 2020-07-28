import React from "react";
import renderer from "react-test-renderer";
import withVideoPlayer from "./with-video-player.js";
import PropTypes from "prop-types";

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
        isMuted={true}
        source={`/img/movie`}
        poster={`/img/movie`}
        width={10}
        height={10}
        isPlaying={false}
      />, {
        createNodeMock: () => {
          return {};
        }}
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
