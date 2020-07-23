import React from "react";
import renderer from "react-test-renderer";
import SmallCardVideoPlayer from "./small-card-video-player.js";

const VideoPreview = {
  WIDTH: 200,
  HEIGHT: 200,
  IS_MUTED: false,
};

const movie = {
  preview: `https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4`,
  cardImg: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
};

it(`Render SmallCardVideoPlayer`, () => {

  const tree = renderer.create(
      <SmallCardVideoPlayer
        isMuted={VideoPreview.IS_MUTED}
        poster={movie.cardImg}
        source={movie.preview}
        width={VideoPreview.WIDTH}
        height={VideoPreview.HEIGHT}
        isPlaying={true}
      />, {
        createNodeMock: () => {
          return {};
        }
      }).toJSON();

  expect(tree).toMatchSnapshot();
});
