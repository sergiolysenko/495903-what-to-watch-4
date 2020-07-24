import React from "react";
import renderer from "react-test-renderer";
import {Header} from "./header.jsx";

const authorizationStatus = `AUTH`;

it(`Render Header`, () => {
  const tree = renderer
    .create(<Header
      authorizationStatus={authorizationStatus}
    />
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
