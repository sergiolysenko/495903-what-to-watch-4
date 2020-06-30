import React from "react";
import renderer from "react-test-renderer";
import App from "./app.jsx";

it(`Render App`, () => {
  const tree = renderer
    .create(<App
      mainCardTitle={`The Grand Budapest Hotel`}
      mainCardGenre={`Drama`}
      mainCardYear={2014}
      movieTitles={[`Fantastic Beasts`, `Seven Years in Tibet`]}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
