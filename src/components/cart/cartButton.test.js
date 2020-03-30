import React from "react";
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import configureStore from 'redux-mock-store'

import CartButton from "./cartButton";

const mockStore = configureStore([]);
Enzyme.configure({ adapter: new Adapter() });

describe('CartButton', () => {
    let store;
    
    beforeAll(() => {
        global.fetch = jest.fn();
        store = mockStore({})
        // store = mockStore({
        //     messages: [],
        // });
        // store.dispatch = jest.fn();
    });

    let wrapper;

    beforeEach(() => {
        wrapper = mount(<CartButton store={store}/>);
     });
     
     afterEach(() => {
        wrapper.unmount();
     });

    it("render", () => {
        expect(wrapper.find("button").exists()).toBeTruthy();
        expect(wrapper.find("img").exists()).toBeTruthy();
        // const spyDidMount = jest.spyOn(CartButton.prototype,"restCartAdd");
        wrapper.find("button").simulate('click')
    });


})