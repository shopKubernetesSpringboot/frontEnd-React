
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import MockAdapter from 'axios-mock-adapter';

import * as restClientModules from './restClient';
import {AXIOS,FETCH} from '../RestClient'

const axiosMock = new MockAdapter(restClientModules.rest);

Enzyme.configure({ adapter: new Adapter() });

describe('ProductList (React-Redux) Component', () => {
    axiosMock.onGet().reply(200, []);
    axiosMock.onOptions().reply(200);
    
    global.fetch = jest.fn()
    const mockJsonPromise = Promise.resolve([]);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    function test(res) {
        expect(res).toStrictEqual(mockJsonPromise)
    }

    it(FETCH, ()=> {
        test(restClientModules.load(FETCH,''))
        test(restClientModules.load(FETCH,'search'))
    })

    it(AXIOS, ()=> {
        test(restClientModules.load(AXIOS,''))
        test(restClientModules.load(AXIOS,'search'))
    })

})