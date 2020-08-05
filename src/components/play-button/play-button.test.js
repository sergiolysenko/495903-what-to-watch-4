import React from "react";
import renderer from "react-test-renderer";
import PlayButton from "./play-button.jsx";
import {Router} from "react-router-dom";
import history from "./../../history.js";

it(`Render PlayButton`, () => {
  const tree = renderer.create(
      <Router history={history}>
        <PlayButton
          id={1}
        />
      </Router>).toJSON();
  expect(tree).toMatchSnapshot();
});
