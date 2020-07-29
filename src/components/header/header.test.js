import React from "react";
import renderer from "react-test-renderer";
import {Header} from "./header.jsx";

const isAuthorised = true;

it(`Render Header`, () => {
  const tree = renderer
    .create(<Header
      isAuthorised={isAuthorised}
    />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
