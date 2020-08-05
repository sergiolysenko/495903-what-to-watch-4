import React from "react";
import renderer from "react-test-renderer";
import {Header} from "./header.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";
const isAuthorised = true;

it(`Render Header`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <Header
            isAuthorised={isAuthorised}
          />
        </Router>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
