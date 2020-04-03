import React from "react";
import Enzyme, { mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import configureStore from 'redux-mock-store'

import MockAdapter from 'axios-mock-adapter';

import CartButton from "./CartButton";
import * as restClientModules from './restClient';
import {AXIOS,FETCH} from '../RestClient';

const axiosMock = new MockAdapter(restClientModules.rest);

const mockStore = configureStore([]);
Enzyme.configure({ adapter: new Adapter() });

describe('CartButton', () => {
    let store = mockStore({})
    let wrapper;
    let reloadCartSpy = jest.fn()  //todo reloadCart callback not testes
    let product = { id: "productId", name: "productName" }

    beforeEach(() => {
        global.fetch = jest.fn()
    });
     
    afterEach(() => {
    });

    it("render with "+FETCH, () => {
        const mockSuccessResponse = { data: {} };
        const mockJsonPromise = Promise.resolve(mockSuccessResponse);
        const mockFetchPromise = Promise.resolve({
          json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

        wrapper = mount(<CartButton  store={store} reloadCart={reloadCartSpy} product={product} restClient={FETCH}/>);
        wrapper.restApi_CartAdd = jest.fn(() => mockJsonPromise) //todo check this line (not needed, don't exists)
        expect(wrapper.find("button").exists()).toBeTruthy();
        expect(wrapper.find("img").exists()).toBeTruthy();
        wrapper.find("button").simulate('click')
        expect(global.fetch).toHaveBeenCalled()
        wrapper.unmount();
    });

    it("render with "+AXIOS, () => {
        axiosMock.onPost().reply(200);
        wrapper = mount(<CartButton  store={store} reloadCart={reloadCartSpy} product={product} restClient={AXIOS}/>);
        expect(wrapper.find("button").exists()).toBeTruthy();
        expect(wrapper.find("img").exists()).toBeTruthy();
        wrapper.find("button").simulate('click')
        expect(global.fetch).not.toHaveBeenCalled()

        //rejected request
        restClientModules.add = jest.fn().mockReturnValue(Promise.reject('rejectReason'))
        wrapper.find("button").simulate('click')
        expect(restClientModules.add.mock.calls.length).toBe(1);
        
        wrapper.unmount();
    });


})