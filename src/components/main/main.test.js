import React from "react";
import renderer from "react-test-renderer";
import Main from "./Main.jsx";

it(`Render Main`, () => {
  const tree = renderer
    .create(<Main
      mainCardTitle={`The Grand Budapest Hotel`}
      mainCardGenre={`Drama`}
      mainCardYear={2014}
      movieTitles={[`Fantastic Beasts`, `Seven Years in Tibet`]}
    />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
