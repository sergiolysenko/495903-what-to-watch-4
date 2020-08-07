import {PrivateRoute} from "./private-route.jsx";
import React from "react";
import Enzyme, {mount} from "enzyme";
import {MemoryRouter} from "react-router";
import {AuthorizationStatus} from "../../reducer/user/user.js";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({
  adapter: new Adapter(),
});

it(`should render component if user has been authenticated`, () => {
  const mockComponent = () => <div>Mock component</div>;
  const props = {path: `/privatepath`, component: mockComponent};
  const renderMock = jest.fn();
  mount(
      <MemoryRouter initialEntries={[props.path]}>
        <PrivateRoute
          path={props.path}
          exact={true}
          render={renderMock}
          authorizationStatus={AuthorizationStatus.AUTH} ownProps={props} />
      </MemoryRouter>);

  expect(renderMock).toHaveBeenCalledTimes(1);
});

it(`should redirect if user is not authenticated`, () => {
  const AComponent = () => <div>AComponent</div>;
  const props = {path: `/aprivatepath`, component: AComponent};
  const renderMock = jest.fn();
  const enzymeWrapper = mount(
      <MemoryRouter initialEntries={[props.path]}>
        <PrivateRoute path={props.path}
          exact={true}
          render={renderMock}
          authorizationStatus={AuthorizationStatus.NO_AUTH} ownProps={props} />
      </MemoryRouter>
  );
  const history = enzymeWrapper.find(`Router`).prop(`history`);
  expect(history.location.pathname).toBe(`/login`);
});
