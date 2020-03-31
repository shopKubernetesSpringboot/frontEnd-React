import React from "react";
import { render, unmountComponentAtNode } from "react-dom";
import { act } from "react-dom/test-utils";
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import configureStore from 'redux-mock-store'
import { Provider } from 'react-redux';
import renderer from 'react-test-renderer';

import ProductList from "./ProductList";

const mockStore = configureStore([]);
Enzyme.configure({ adapter: new Adapter() });

describe('My Connected React-Redux Component', () => {
    let store;
    let container = null;
    let reloadCart = jest.fn()
    let products = [ {id: 'testProductId', name: 'testProductName'} ]
    
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

    // it("render (Axios)", () => {
    //     store = mockStore();
    //     let restClient='Axios';
    //     let wrapper = mount(
    //           <ProductList reloadCart={reloadCart} restClient={restClient} store={store}/>
    //       );
    //     wrapper.setState({ products: [ {id: 'xxx', name: 'yyy'} ]})
    //     expect(wrapper.find("h4").exists()).toBeTruthy();
    // });

    it("render (Fetch)", () => {
        store = mockStore()
        let restClient='Fetch'
        let wrapper = mount(
            <Provider store={store}>
              <ProductList reloadCart={reloadCart} restClient={restClient} products={products}/>
            </Provider>
          );
        // console.log(wrapper.debug({verbose:true}))
        // console.log(wrapper.find('ProductListRender').debug({verbose:true}))
        // let component=wrapper.find('ProductListRender') //.dive()
        // component.setState({ products: [ {id: 'xxx', name: 'yyy'} ]})
        expect(wrapper.find("h4").exists()).toBeTruthy();
        expect(wrapper.find("[placeholder='Search for...']").exists()).toBeTruthy();
        // expect(wrapper.find("div.innerBox div div").at(1)).toHaveTextContent(products[0].name);
        expect(wrapper.find("div.innerBox div div").at(1).getDOMNode()).toHaveTextContent(products[0].name);
    });

})