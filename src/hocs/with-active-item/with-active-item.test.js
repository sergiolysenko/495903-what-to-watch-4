import React from "react";
import withActiveItem from "./with-active-item.js";
import renderer from "react-test-renderer";

const mockComponent = () => <div />;

const MockComponentWrapped = withActiveItem(mockComponent);

it(`render`, () => {
  const tree = renderer.create(
      <MockComponentWrapped />
  ).toJSON();

  expect(tree).toMatchSnapshot();
});
