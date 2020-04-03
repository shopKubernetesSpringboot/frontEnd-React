
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

import MockAdapter from 'axios-mock-adapter';

import * as restClientModules from './restClient';

const axiosMock = new MockAdapter(restClientModules.rest);

Enzyme.configure({ adapter: new Adapter() });

describe('ProductList (React-Redux) Component', () => {
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

    it("fetch", () => {
        expect(restClientModules.list('Fetch')).toStrictEqual(mockJsonPromise);
        expect(restClientModules.add('Fetch', product)).toStrictEqual(mockJsonPromise);
        expect(restClientModules.clean('Fetch')).toStrictEqual(mockJsonPromise);
    })

    it("axios", () => {
        expect(restClientModules.list('Axios')).toStrictEqual(mockJsonPromise);
        expect(restClientModules.add('Axios', product)).toStrictEqual(mockJsonPromise);
        expect(restClientModules.clean('Axios')).toStrictEqual(mockJsonPromise);
    })

})