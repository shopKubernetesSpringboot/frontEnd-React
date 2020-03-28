import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { setError } from '../actions'

import Messages from "./messages";

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
        expect(component.toJSON()).toMatchSnapshot();
        renderer.act(() => {  });
        expect(component.textContent).toBe(undefined);
    });

    it("render with message", () => {
        store = mockStore({
            messages: [{ errorMsg: 'XErrorMsgX', error: 'XErrorX' }],
        });
        let component = renderer.create(
            <Provider store={store}>
              <Messages />
            </Provider>
          );
        let div=component.toTree().rendered.rendered.rendered
        expect(div.props.children.type).toBe("pre")
        expect(div.props.children.props.children.type).toBe("code")
        expect(div.props.children.props.children.props.children).toBe("XErrorMsgX\nXErrorX")
    });
})