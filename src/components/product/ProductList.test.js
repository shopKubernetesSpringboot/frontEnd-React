import React from "react";
import { unmountComponentAtNode } from "react-dom";
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import configureStore from 'redux-mock-store'
import MockAdapter from 'axios-mock-adapter';
import { Provider } from 'react-redux';

import ProductList from "./ProductList";
import * as restClientModules from './restClient';

const axiosMock = new MockAdapter(restClientModules.rest);

const mockStore = configureStore([]);
Enzyme.configure({ adapter: new Adapter() });

describe('ProductList (React-Redux) Component', () => {
    let store = mockStore()
    let reloadCart = jest.fn()
    let products = [ {id: 'testProductId', name: 'testProductName'} ]
    
    it("render", () => {
        let restClient='Fetch'
        const wrapper = mount(
            <Provider store={store}>
              <ProductList reloadCart={reloadCart} restClient={restClient} products={products}/>
            </Provider>);
        // console.log(wrapper.debug({verbose:true}))
        // console.log(wrapper.find('ProductListRender').debug({verbose:true}))
        expect(wrapper.find("h4").exists()).toBeTruthy();
        expect(wrapper.find("[placeholder='Search for...']").exists()).toBeTruthy();
        // expect(wrapper.find("div.innerBox div div").at(1)).toHaveTextContent(products[0].name);
        expect(wrapper.find("div.innerBox div div").at(1).getDOMNode()).toHaveTextContent(products[0].name);
    });

    it("rest functions", () => {
        axiosMock.onGet().reply(200, []);
        axiosMock.onOptions().reply(200);
        const wrapper = mount(
            <Provider store={store}>
                <ProductList reloadCart={reloadCart} restClient={'Axios'} products={products}/>
            </Provider>);

        //resolved request
        restClientModules.load = jest.fn().mockReturnValue(Promise.resolve({ data: products }))
        // wrapper.find('ProductListRender').instance().props.loadProducts()
        wrapper.find('h4').simulate('click')
        expect(restClientModules.load.mock.calls.length).toBe(1);
        expect(axiosMock.history.get.length).toBe(0);
        expect(axiosMock.history.options.length).toBe(0);

        // //rejected request
        restClientModules.load = jest.fn().mockReturnValue(Promise.reject('rejectReason'))
        wrapper.find('h4').simulate('click')
        expect(restClientModules.load.mock.calls.length).toBe(1);
        expect(axiosMock.history.get.length).toBe(0);
        expect(axiosMock.history.options.length).toBe(0);

        //todo exception request (with fetch I think)
      });


})