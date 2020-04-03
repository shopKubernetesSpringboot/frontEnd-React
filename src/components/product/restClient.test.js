
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import MockAdapter from 'axios-mock-adapter';

import * as restClientModules from './restClient';

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

    it("fetch", ()=> {
        test(restClientModules.load('Fetch',''))
        test(restClientModules.load('Fetch','xx'))
    })

    it("axios", ()=> {
        test(restClientModules.load('Axios',''))
        test(restClientModules.load('Axios','xx'))
    })

})