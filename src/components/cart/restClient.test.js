
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
    const product = { id: 'testProductId1', name: 'testProductName2', quantity: 1 }

    it("list (fetch)", () => {
        let res = restClientModules.list('Fetch')
        expect(res).toStrictEqual(mockJsonPromise);
    })

    it("list (axios)", () => {
        let res = restClientModules.list('Axios')
        expect(res).toStrictEqual(mockJsonPromise);
    })

    it("add (fetch)", () => {
        let res = restClientModules.add('Fetch', product)
        expect(res).toStrictEqual(mockJsonPromise);
    })

    it("add (axios)", () => {
        let res = restClientModules.add('Axios', product)
        expect(res).toStrictEqual(mockJsonPromise);
    })

    it("clean (fetch)", () => {
        let res = restClientModules.clean('Fetch')
        expect(res).toStrictEqual(mockJsonPromise);
    })

    it("clean (axios)", () => {
        let res = restClientModules.clean('Axios')
        expect(res).toStrictEqual(mockJsonPromise);
    })

})