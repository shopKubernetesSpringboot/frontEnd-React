
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

    it("fetch", ()=> { //must be the first test to avoid restClientModules.load mock
        let res=restClientModules.load('Fetch','')
        expect(res).toStrictEqual(mockJsonPromise);
        res=restClientModules.load('Fetch','xx')
        expect(res).toStrictEqual(mockJsonPromise);
    })

    it("axios", ()=> { //must be the first test to avoid restClientModules.load mock
        let res=restClientModules.load('Axios','')
        expect(res).toStrictEqual(mockJsonPromise);
        res=restClientModules.load('Axios','xx')
        expect(res).toStrictEqual(mockJsonPromise);
    })

})