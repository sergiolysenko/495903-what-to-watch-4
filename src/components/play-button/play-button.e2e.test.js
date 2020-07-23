import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import PlayButton from "./play-button.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Check click on button play`, () => {
  const onPlayClick = jest.fn();

  const playButtonComponent = shallow(
      <PlayButton
        onPlayClick={onPlayClick}
      />
  );
  playButtonComponent.find(`.btn--play`).simulate(`click`);
  expect(onPlayClick.mock.calls.length).toBe(1);
});
