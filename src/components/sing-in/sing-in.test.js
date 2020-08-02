import React from "react";
import renderer from "react-test-renderer";
import {SingIn} from "./sing-in.jsx";
import {Router} from "react-router-dom";
import history from "./../../history.js";
const mockFunck = () => {};

it(`Render SingIn`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <SingIn
            onSingInClick={mockFunck}
          />
        </Router>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
