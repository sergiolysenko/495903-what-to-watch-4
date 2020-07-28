import React from "react";
import withActiveItem from "./with-active-item.js";
import Enzyme, {shallow} from "enzyme";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({
  adapter: new Adapter(),
});

const mockComponent = () => <div />;

it(`Active item changed`, () => {
  const MockComponentWrapped = withActiveItem(mockComponent);

  const wrapper = shallow(
      <MockComponentWrapped
        activeItem={undefined}
        handleActive={() => {}}
      />
  );

  expect(wrapper.props().activeItem).toEqual(undefined);

  wrapper.props().handleActive(10);
  expect(wrapper.props().activeItem).toEqual(10);
});
