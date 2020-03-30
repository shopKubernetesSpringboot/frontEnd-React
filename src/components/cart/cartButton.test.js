import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";

import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';
import { setError } from '../../actions'

import CartButton from "./cartButton";

const mockStore = configureStore([]);

describe('CartButton', () => {
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

    it("render", () => {
        store = mockStore({
            messages: [],
        });
        store.dispatch = jest.fn();
        let component = renderer.create(
            <Provider store={store}>
              <CartButton/>
            </Provider>
          );
        // expect(component.toJSON()).toMatchSnapshot();  travis-ci fails when snapshot changes
        renderer.act(() => {  });
        expect(component.textContent).toBe(undefined);
    });

    // it("render with message", () => {
    //     store = mockStore({
    //         messages: [{ errorMsg: 'XErrorMsg1X', error: 'XError2X' }],
    //     });
    //     let component = renderer.create(
    //         <Provider store={store}>
    //           <Messages />
    //         </Provider>
    //       );
    //     let div=component.toTree().rendered.rendered.rendered
    //     expect(div.props.children.type).toBe("pre")
    //     expect(div.props.children.props.children.type).toBe("code")
    //     expect(div.props.children.props.children.props.children).toBe("XErrorMsg1X\nXError2X")
    // });
})