import React from "react";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {SingIn} from "./sing-in.jsx";

Enzyme.configure({
  adapter: new Adapter(),
});

const mockEvent = {
  preventDefault() {}
};

it(`Check click on button submit`, () => {
  const onSingInClick = jest.fn();

  const singInComponent = shallow(
      <SingIn
        onSingInClick={onSingInClick}
        isEmailValid={true}
      />, {
        createNodeMock: () => {
          return {};
        }
      });

  singInComponent.instance().emailRef = {
    current: {
      value: `12344@mail.com`
    }
  };

  singInComponent.instance().passwordRef = {
    current: {
      value: `12345`
    }
  };

  singInComponent.find(`.sign-in__btn`).simulate(`click`, mockEvent);
  expect(onSingInClick.mock.calls.length).toBe(1);
});
