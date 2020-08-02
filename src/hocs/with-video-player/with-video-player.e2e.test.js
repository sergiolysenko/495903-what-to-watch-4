import React from "react";
import Enzyme, {mount} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {withVideoPlayer} from "./with-video-player.js";
import PropTypes from "prop-types";

Enzyme.configure({
  adapter: new Adapter(),
});

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

const historyProps = {
  match: {
    params: {id: 1}
  }
};
const MockComponent = (props) => {
  const {children, handlePlayClick, handleFullScreen} = props;

  return <div>
    <button className="pause" onClick={handlePlayClick} />
    <button className="play" onClick={handlePlayClick} />
    <button className="fullScreen" onClick={handleFullScreen} />
    {children}
  </div>;
};

MockComponent.propTypes = {
  children: PropTypes.node.isRequired,
  handlePlayClick: PropTypes.func.isRequired,
  handleFullScreen: PropTypes.func.isRequired,
};

const MockComponentWrapped = withVideoPlayer(MockComponent);

window.HTMLMediaElement.prototype.play = () => {};
window.HTMLMediaElement.prototype.pause = () => {};

it(`Check on pause click`, () => {
  const withVideoPlayerComponent = mount(
      <MockComponentWrapped
        movie={movie}
        historyProps={historyProps}
      />
  );

  withVideoPlayerComponent.setState({
    isPlaying: true
  });

  const {videoRef} = withVideoPlayerComponent.instance();
  jest.spyOn(videoRef.current, `pause`);
  withVideoPlayerComponent.instance().componentDidUpdate();


  withVideoPlayerComponent.find(`button.pause`).simulate(`click`);
  expect(videoRef.current.pause).toHaveBeenCalledTimes(1);
});
