import React from "react";
import renderer from "react-test-renderer";
import withPlayingCard from "./with-playing-card.js";

const mockComponent = () => <div />;
const mockFunck = () => {};

const MockComponentWrapped = withPlayingCard(mockComponent);

it(`render withPlayingCard`, () => {
  const tree = renderer.create(
      <MockComponentWrapped
        isPlaying={false}
        onMouseEnter={mockFunck}
        onMouseLeave={mockFunck}
      />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
