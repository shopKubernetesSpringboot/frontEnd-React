
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import MockAdapter from 'axios-mock-adapter';

import * as restClientModules from './restClient';
import {AXIOS,FETCH} from '../RestClient'

const axiosMock = new MockAdapter(restClientModules.rest);

Enzyme.configure({ adapter: new Adapter() });

describe('Cart restClient', () => {
    axiosMock.onGet().reply(200, []);
    axiosMock.onPost().reply(200);
    axiosMock.onDelete().reply(200);
    axiosMock.onOptions().reply(200);
    
    global.fetch = jest.fn()
    const mockJsonPromise = Promise.resolve([]);
    const mockFetchPromise = Promise.resolve({
        json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);
    
    const product = { id: 'testProductId1', name: 'testProductName2', quantity: 1 }

    function test(res) {
        expect(res).toStrictEqual(mockJsonPromise)
    }

    it(FETCH, () => {
        test(restClientModules.list(FETCH))
        test(restClientModules.add(FETCH, product))
        test(restClientModules.clean(FETCH))
    })

    it(AXIOS, () => {
        test(restClientModules.list(AXIOS))
        test(restClientModules.add(AXIOS, product))
        test(restClientModules.clean(AXIOS))
    })

})