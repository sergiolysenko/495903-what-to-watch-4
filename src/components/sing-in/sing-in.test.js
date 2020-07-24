import React from "react";
import renderer from "react-test-renderer";
import {SingIn} from "./sing-in.jsx";

const mockFunck = () => {};

it(`Render SingIn`, () => {
  const tree = renderer
    .create(<SingIn
      onSingInClick={mockFunck}
    />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
