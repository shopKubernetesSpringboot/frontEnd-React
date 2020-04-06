import React from "react";
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import configureStore from 'redux-mock-store'

import MockAdapter from 'axios-mock-adapter';

import CartList from "./CartList";
import * as restClientModules from './restClient';
import { AXIOS } from '../RestClientSelector';

const axiosMock = new MockAdapter(restClientModules.rest);

const mockStore = configureStore([]);
Enzyme.configure({ adapter: new Adapter() });

const trashButtonSelector = "div.innerBox div.cartSummary button img[src='trash.svg']";

describe('Cart (React-Redux) Component', () => {
    let store = mockStore();
    let reloadCart = jest.fn()
    let items = [
        { id: 'testProductId1', name: 'testProductName2', quantity: 1 },
        { id: 'testProductId2', name: 'testProductName2', quantity: 2 }
    ]

    it("render empty cart", () => {
        const wrapper = mount(<CartList reload={reloadCart} restClient={AXIOS} items={[]} store={store} />);
        expect(wrapper.find("h4").exists()).toBeTruthy();
        expect(wrapper.find("div.innerBox div").at(0).getDOMNode()).toHaveTextContent('Cart is empty');
    });

    it("render failed to get cart data", () => {
        const wrapper = mount(<CartList reload={reloadCart} restClient={AXIOS} store={store} />);
        expect(wrapper.find("h4").exists()).toBeTruthy();
        expect(wrapper.find("div.innerBox div").at(0).getDOMNode()).toHaveTextContent('Failed to get cart data');
    });

    it("render cart list", () => {
        const wrapper = mount(<CartList reload={reloadCart} restClient={AXIOS} items={items} store={store} />);
        // console.log(wrapper.debug({verbose:true}))
        // console.log(wrapper.find('.cartSummary').debug({verbose:true}))
        expect(wrapper.find("h4").exists()).toBeTruthy();
        expect(wrapper.find("div.innerBox div.cartSummary").at(0).getDOMNode()).toHaveTextContent('3 Items2 Products');
        expect(wrapper.find("div.innerBox div.sep").length).toBe(items.length);
        expect(wrapper.find("div.innerBox div.cartSummary button").length).toBe(2);
        expect(wrapper.find(trashButtonSelector).length).toBe(1);
        expect(wrapper.find("div.innerBox div.cartSummary button img[src='ok.svg']").length).toBe(1);
    });

    it("rest functions", () => {
        axiosMock.onGet().reply(200, []);
        axiosMock.onOptions().reply(200);
        const wrapper = mount(<CartList reload={reloadCart} restClient={AXIOS} items={items} store={store} />);
        let trashButton = wrapper.find(trashButtonSelector)
        expect(trashButton.length).toBe(1);

        //resolved request
        restClientModules.clean = jest.fn().mockReturnValue(Promise.resolve({}))
        restClientModules.list = jest.fn().mockReturnValue(Promise.resolve([]))
        trashButton.simulate('click')
        expect(restClientModules.clean.mock.calls.length).toBe(1);
        expect(restClientModules.list.mock.calls.length).toBe(0);
        expect(axiosMock.history.get.length).toBe(3);
        expect(axiosMock.history.options.length).toBe(0);

        //rejected request
        restClientModules.clean = jest.fn().mockReturnValue(Promise.reject('rejectReason'))
        restClientModules.list = jest.fn().mockReturnValue(Promise.reject('rejectReason'))
        trashButton.simulate('click')
        expect(restClientModules.clean.mock.calls.length).toBe(1);
        expect(restClientModules.list.mock.calls.length).toBe(0);
        expect(axiosMock.history.get.length).toBe(3);
        expect(axiosMock.history.options.length).toBe(0);

        //todo exception request (with fetch I think)
        // axiosMock.onGet().networkError();
        // restClientModules.clean = jest.fn().mockReturnValue(Promise.reject(new Error('errorMessage')))  //undefined
        // restClientModules.list = jest.fn().mockReturnValue(Promise.reject(new Error('errorMessage'))) //undefined
        // trashButton.simulate('click')
        // expect(restClientModules.clean.mock.calls.length).toBe(1);
        // expect(restClientModules.list.mock.calls.length).toBe(0);
        // expect(axiosMock.history.get.length).toBe(3);
        // expect(axiosMock.history.options.length).toBe(0);
    });

})