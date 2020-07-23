import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import SmallCardVideoPlayer from "./small-card-video-player.js";

Enzyme.configure({
  adapter: new Adapter(),
});

const VideoPreview = {
  WIDTH: 200,
  HEIGHT: 200,
  IS_MUTED: false,
};

const movie = {
  preview: `https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4`,
  cardImg: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
};

it(`Check if state is playing`, () => {
  const isPlaying = true;
  const smallCardVideoPlayer = mount(
      <SmallCardVideoPlayer
        isMuted={VideoPreview.IS_MUTED}
        poster={movie.cardImg}
        source={movie.preview}
        isPlaying={isPlaying}
        width={VideoPreview.WIDTH}
        height={VideoPreview.HEIGHT}
      />, {
        createNodeMock: () => {
          return {};
        }
      }
  );
  expect(smallCardVideoPlayer.props().isPlaying).toBe(isPlaying);
});
