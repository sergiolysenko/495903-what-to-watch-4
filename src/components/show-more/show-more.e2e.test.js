import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {ShowMore} from "./show-more.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Check click on button show-more `, () => {
  const onClick = jest.fn();

  const showMore = shallow(
      <ShowMore
        isButtonDisplayed={true}
        onClick={onClick}
      />
  );
  showMore.find(`.catalog__button`).simulate(`click`);
  expect(onClick.mock.calls.length).toBe(1);
});
