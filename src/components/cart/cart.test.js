import React from "react";
import { unmountComponentAtNode } from "react-dom";
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'
// import render from 'react-test-renderer'
import {cleanup, fireEvent, render} from '@testing-library/react';

import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';

import MockAdapter from 'axios-mock-adapter';

import Cart from "./cart";
// import { list, clean } from './restClient'
import * as restClientModules from './restClient';

const axiosMock = new MockAdapter(restClientModules.rest);

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

    // it("clean function", () => {
    //     store = mockStore()
    //     jest.mock('./restClient'); // this happens automatically with auto mocking
    //     const restClient = require('./restClient');
    //     // restClient.clean.mockImplementation(() => Promise.resolve({}));
    //     restClient.clean.mockResolvedValue({})
    //     // jest.mock('list');
    //     // list.mockResolvedValue(Promise.resolve({}))

    //     let wrapper = mount(
    //         <Provider store={store}>
    //           <Cart reload={reloadCart} restClient={'Axios'} items={items}/>
    //         </Provider>
    //       );
    //     expect(wrapper.find("div.innerBox div.cartSummary button").length).toBe(items.length+1);
    //     let trashButton=wrapper.find("div.innerBox div.cartSummary button img[src='trash.svg']")
    //     expect(trashButton.length).toBe(1);
    //     trashButton.simulate('click')
    //     // trashButton.invoke('onClick')
    //     wrapper.update()
    //     // wrapper.render()
    //     expect(restClient.clean.mock.calls.length).toBe(1);
    //     // console.log(wrapper.find('CartRender').debug({verbose:true}))
    //     // expect(wrapper.find("div.innerBox div").at(0).getDOMNode()).toHaveTextContent('Cart is empty');
    // });

    it("clean function", () => {
        store = mockStore()
        let reloadCart = jest.fn()
        let items = [ {id: 'testProductId', name: 'testProductName', quantity: 1} ]
        axiosMock.onGet().reply(200, []);
        axiosMock.onOptions().reply(200);
        restClientModules.clean = jest.fn().mockReturnValue(Promise.resolve({ status: 200}))
        restClientModules.list = jest.fn().mockReturnValue(Promise.resolve([]))
        const wrapper = mount(
          <Cart reload={reloadCart} restClient={'Axios'} items={items} store={store}/>
        );
        expect(wrapper.find("div.innerBox div.cartSummary button").length).toBe(items.length+1);
        let trashButton=wrapper.find("div.innerBox div.cartSummary button img[src='trash.svg']")
        expect(trashButton.length).toBe(1);
        trashButton.simulate('click')
        expect(restClientModules.clean.mock.calls.length).toBe(1);
        expect(restClientModules.list.mock.calls.length).toBe(1);
        expect(axiosMock.history.get.length).toBe(3);
        expect(axiosMock.history.options.length).toBe(0);
        // wrapper.update()
        // const newRender=wrapper.render()
        // console.log(wrapper.find('CartRender').debug({verbose:true}))
        // expect(wrapper.find("div.innerBox div").at(0).getDOMNode()).toHaveTextContent('Cart is empty');

        // console.log(component)
        // let tree = component.toJSON()
        // expect(tree).toMatchSnapshot();
        // // manually trigger the callback
        // tree.props.cleanCart();
        // // re-rendering
        // tree = component.toJSON();
        // expect(tree).toMatchSnapshot();        


        // // trashButton.invoke('onClick')
    });

})