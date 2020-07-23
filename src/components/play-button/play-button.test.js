import React from "react";
import renderer from "react-test-renderer";
import PlayButton from "./play-button.jsx";

it(`Render PlayButton`, () => {
  const tree = renderer.create(
      <PlayButton
        onPlayClick={() => {}}
      />).toJSON();
  expect(tree).toMatchSnapshot();
});
