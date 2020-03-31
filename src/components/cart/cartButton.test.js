import React from "react";
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import configureStore from 'redux-mock-store'

import CartButton from "./cartButton";

const mockStore = configureStore([]);
Enzyme.configure({ adapter: new Adapter() });

describe('CartButton', () => {
    let store;
    let reloadCartSpy;
    let product = { id: "productId", name: "productName" }

    beforeAll(() => {
        store = mockStore({})
        // store = mockStore({
        //     messages: [],
        // });
        // store.dispatch = jest.fn();
    });

    let wrapper;

    beforeEach(() => {
        reloadCartSpy = jest.fn()  //todo reloadCart callback not testes
        global.fetch = jest.fn()
    });
     
    afterEach(() => {
    });

    it("render with Fetch", () => {
        const mockSuccessResponse = { data: {} };
        const mockJsonPromise = Promise.resolve(mockSuccessResponse); // 2
        const mockFetchPromise = Promise.resolve({ // 3
          json: () => mockJsonPromise,
        });
        jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise); // 4

        wrapper = mount(<CartButton  store={store} reloadCart={reloadCartSpy} product={product} restClient={'Fetch'}/>);
        wrapper.restApi_CartAdd = jest.fn(() => mockJsonPromise)
        expect(wrapper.find("button").exists()).toBeTruthy();
        expect(wrapper.find("img").exists()).toBeTruthy();
        wrapper.find("button").simulate('click')
        expect(global.fetch).toHaveBeenCalled()
        // expect(reloadCartSpy).toHaveBeenCalled()
        wrapper.unmount();
    });

    it("render with Axios", () => {
        wrapper = mount(<CartButton  store={store} reloadCart={reloadCartSpy} product={product} restClient={'Axios'}/>);
        expect(wrapper.find("button").exists()).toBeTruthy();
        expect(wrapper.find("img").exists()).toBeTruthy();
        wrapper.find("button").simulate('click')
        expect(global.fetch).not.toHaveBeenCalled()
        // expect(reloadCartSpy).toHaveBeenCalled()
        wrapper.unmount();
    });


})