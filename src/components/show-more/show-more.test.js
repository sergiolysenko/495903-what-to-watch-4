import React from "react";
import renderer from "react-test-renderer";
import {ShowMore} from "./show-more.jsx";
import configureStore from "redux-mock-store";
import {Provider} from "react-redux";

const mockStore = configureStore([]);

it(`Render ShowMore`, () => {
  const store = mockStore({
    isButtonDisplayed: true,
    onClick: () => {},
  });
  const tree = renderer
    .create(
        <Provider store={store}>
          <ShowMore
            isButtonDisplayed={true}
            onClick={() => {}}
          />
        </Provider>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
