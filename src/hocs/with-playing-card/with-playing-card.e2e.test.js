import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import withPlayingCard from "./with-playing-card.js";

Enzyme.configure({
  adapter: new Adapter(),
});

const mockComponent = () => <div />;

const MockComponentWrapped = withPlayingCard(mockComponent);

it(`Should change prop isPlaying`, () => {
  const wrapper = shallow(
      <MockComponentWrapped
        isPlaying={false}
        onMouseEnter={() => {}}
        onMouseLeave={() => {}}
      />
  );

  expect(wrapper.props().isPlaying).toEqual(false);

  wrapper.props().onMouseEnter();
  setTimeout(() => {
    expect(wrapper.props().isPlaying).toEqual(true);
  }, 1000);
  wrapper.props().onMouseLeave();
  expect(wrapper.props().isPlaying).toEqual(false);
});
