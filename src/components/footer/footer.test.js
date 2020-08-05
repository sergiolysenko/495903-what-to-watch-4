import React from "react";
import renderer from "react-test-renderer";
import Footer from "./footer.jsx";
import {Router} from "react-router-dom";
import history from "../../history.js";

it(`Render Footer`, () => {
  const tree = renderer
    .create(
        <Router history={history}>
          <Footer
          />
        </Router>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
