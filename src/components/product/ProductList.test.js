import React from "react";
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
        axiosMock.onGet().reply(200, []);
        axiosMock.onOptions().reply(200);
        restClientModules.load = jest.fn().mockReturnValue(Promise.resolve([]))
        const wrapper = mount(
            <Provider store={store}>
              <ProductList reloadCart={reloadCart} restClient={'Axios'} products={products}/>
            </Provider>);
        // console.log(wrapper.debug({verbose:true}))
        // console.log(wrapper.find('ProductListRender').debug({verbose:true}))
        expect(wrapper.find("h4").exists()).toBeTruthy();
        let inputSelector="[placeholder='Search for...']"
        let inputSearch=wrapper.find(inputSelector).at(0)
        expect(wrapper.find("div.innerBox div div").at(1).getDOMNode()).toHaveTextContent(products[0].name);
        inputSearch.simulate('focus')
        inputSearch.simulate('change', { target: { value: 'X' } })
        expect(wrapper.find(inputSelector).prop('value')).toBe('X');
        // wrapper.update()
        // todo expect(wrapper.find("div.innerBox div div").at(1).getDOMNode()).toHaveTextContent('No products found');
    });

    it("render Failed to get products data", () => {
        const wrapper = mount(
            <Provider store={store}>
              <ProductList reloadCart={reloadCart} restClient={'Axios'}/>
            </Provider>);
        expect(wrapper.find("div.innerBox div").at(0).getDOMNode()).toHaveTextContent('Failed to get products data');
    });

    it("rest functions", () => {
        axiosMock.onGet().reply(200, []);
        axiosMock.onOptions().reply(200);
        restClientModules.load = jest.fn().mockReturnValue(Promise.resolve(products))
        const wrapper = mount(
            <Provider store={store}>
                <ProductList reloadCart={reloadCart} restClient={'Axios'} products={products}/>
            </Provider>);

        wrapper.find('h4').simulate('click')
        expect(restClientModules.load.mock.calls.length).toBe(2);
        expect(axiosMock.history.get.length).toBe(0);
        expect(axiosMock.history.options.length).toBe(0);
        expect(wrapper.find("div.innerBox div div").at(1).getDOMNode()).toHaveTextContent(products[0].name);

        // //rejected request
        restClientModules.load = jest.fn().mockReturnValue(Promise.reject('rejectReason'))
        wrapper.find('h4').simulate('click')
        expect(restClientModules.load.mock.calls.length).toBe(1);
        expect(axiosMock.history.get.length).toBe(0);
        expect(axiosMock.history.options.length).toBe(0);

        //todo exception request (with fetch I think)
      });


})