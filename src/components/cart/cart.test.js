import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import Cart from "./cart";

const mockStore = configureStore([]);
Enzyme.configure({ adapter: new Adapter() });

describe('My Connected React-Redux Component', () => {
    let store;
    let container = null;
    let reloadCart = jest.fn()
    let items = [ {id: 'testProductId', name: 'testProductName', quantity: 1} ]
    
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

    it("render empty cart", () => {
        store = mockStore()
        let wrapper = mount(
            <Provider store={store}>
              <Cart reload={reloadCart} restClient={'Axios'} items={[]}/>
            </Provider>
          );
        expect(wrapper.find("h4").exists()).toBeTruthy();
        // expect(wrapper.find("div.innerBox div div").at(1)).toHaveTextContent(products[0].name);
        expect(wrapper.find("div.innerBox div").at(0).getDOMNode()).toHaveTextContent('Cart is empty');
    });

    it("render failed to get cart data", () => {
        store = mockStore()
        let wrapper = mount(
            <Provider store={store}>
              <Cart reload={reloadCart} restClient={'Axios'}/>
            </Provider>
          );
        expect(wrapper.find("h4").exists()).toBeTruthy();
        // expect(wrapper.find("div.innerBox div div").at(1)).toHaveTextContent(products[0].name);
        expect(wrapper.find("div.innerBox div").at(0).getDOMNode()).toHaveTextContent('Failed to get cart data');
    });

    it("render cart list", () => {
        store = mockStore()
        let wrapper = mount(
            <Provider store={store}>
              <Cart reload={reloadCart} restClient={'Axios'} items={items}/>
            </Provider>
          );
        expect(wrapper.find("h4").exists()).toBeTruthy();
        // console.log(wrapper.debug({verbose:true}))
        // console.log(wrapper.find('.cartSummary').debug({verbose:true}))
        expect(wrapper.find("div.innerBox div.cartSummary").at(0).getDOMNode()).toHaveTextContent('1 Items1 Products');
        expect(wrapper.find("div.innerBox div.cartSummary button").length).toBe(items.length+1);
        expect(wrapper.find("div.innerBox div.cartSummary button img[src='trash.svg']").length).toBe(1);
        expect(wrapper.find("div.innerBox div.cartSummary button img[src='ok.svg']").length).toBe(1);
    });

    it("clean button", () => {
        store = mockStore()
        let wrapper = mount(
            <Provider store={store}>
              <Cart reload={reloadCart} restClient={'Axios'} items={items}/>
            </Provider>
          );
        expect(wrapper.find("div.innerBox div.cartSummary button").length).toBe(items.length+1);
        let trashButton=wrapper.find("div.innerBox div.cartSummary button img[src='trash.svg']")
        expect(trashButton.length).toBe(1);
        trashButton.simulate('click')
        // expect(wrapper.find("div.innerBox div").at(0).getDOMNode()).toHaveTextContent('Cart is empty');
    });

})