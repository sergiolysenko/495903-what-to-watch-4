import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import VideoPlayer from "./video-player.jsx";

const VideoPreview = {
  WIDTH: 200,
  HEIGHT: 200,
  IS_MUTED: false,
};

const movie = {
  preview: `https://archive.org/download/BigBuckBunny_124/Content/big_buck_bunny_720p_surround.mp4`,
  cardImg: `img/fantastic-beasts-the-crimes-of-grindelwald.jpg`,
};

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Check if state is playing`, () => {
  const isPlaying = true;
  const videoPlayer = mount(
      <VideoPlayer
        isMuted={VideoPreview.IS_MUTED}
        poster={movie.cardImg}
        source={movie.preview}
        isPlaying={isPlaying}
        width={VideoPreview.WIDTH}
        height={VideoPreview.HEIGHT}
        progress={10}
        timeLeft={`10`}
        handleFullScreen={() => {}}
      >
        <video />
      </VideoPlayer>
  );
  expect(videoPlayer.props().isPlaying).toBe(isPlaying);
});

it(`Check if state is not playing`, () => {
  const isPlaying = false;
  const videoPlayer = mount(
      <VideoPlayer
        isMuted={VideoPreview.IS_MUTED}
        poster={movie.cardImg}
        source={movie.preview}
        isPlaying={isPlaying}
        width={VideoPreview.WIDTH}
        height={VideoPreview.HEIGHT}
        progress={10}
        timeLeft={`10`}
        handleFullScreen={() => {}}
      >
        <video />
      </VideoPlayer>
  );
  expect(videoPlayer.props().isPlaying).toBe(isPlaying);
});
