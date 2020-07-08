import VideoPlayer from "./video-player.jsx";
import React from "react";
import renderer from "react-test-renderer";

const VideoPreview = {
  WIDTH: 200,
  HEIGHT: 200,
  IS_MUTED: false,
};

const movie = {
  preview: `https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4`,
  cardImg: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
};

it(`VideoPlayer is rendered correctly`, () => {

  const tree = renderer.create(
      <VideoPlayer
        isMuted={VideoPreview.IS_MUTED}
        poster={movie.cardImg}
        source={movie.preview}
        isPlaying={true}
        width={VideoPreview.WIDTH}
        height={VideoPreview.HEIGHT}
      />, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

  expect(tree).toMatchSnapshot();
});
