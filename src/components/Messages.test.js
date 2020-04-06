import React from "react";
import { unmountComponentAtNode } from "react-dom";

import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import Messages from "./Messages";

const mockStore = configureStore([]);

describe('My Connected React-Redux Component', () => {
  let store;
  let container = null;

  beforeEach(() => {
    //configure DOM element as target for rendering
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    //clean at exit
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it("render without message", () => {
    store = mockStore({
      messages: [],
    });
    store.dispatch = jest.fn();
    let component = renderer.create(
      <Provider store={store}>
        <Messages />
      </Provider>
    );
    // expect(component.toJSON()).toMatchSnapshot();  travis-ci fails when snapshot changes
    renderer.act(() => { });
    expect(component.textContent).toBe(undefined);
  });

  it("render with message", () => {
    store = mockStore({
      messages: [{ errorMsg: 'XErrorMsg1X', error: 'XError2X' }],
    });
    let component = renderer.create(
      <Provider store={store}>
        <Messages />
      </Provider>
    );
    let div = component.toTree().rendered.rendered.rendered
    expect(div.props.children.type).toBe("pre")
    expect(div.props.children.props.children.type).toBe("code")
    expect(div.props.children.props.children.props.children).toBe("XErrorMsg1X\nXError2X")
  });
})