import React, { Component } from 'react';
import './App.css';
import ProductList from './components/product/ProductList';
import Cart from './components/cart/cart';
import Messages from './components/Messages';
import InfoBox from './components/infoBox';

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './reducers'


export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: "",
            reloadCart: false,
            restClient: 'Axios'
        };

        this.reloadCart = this.reloadCart.bind(this)
        this.restClientHandler = this.restClientHandler.bind(this)

        this.store = createStore(rootReducer)
    }

    reloadCart() {
        this.setState({ reloadCart: true }, this.setState({reloadCart: false}))
    }

    restClientHandler(client) {
        this.setState({restClient: client})
    }

    render() {
        return (
            <Provider store={this.store}>
                <div className="main">
                    <Messages/>

                    <div className="floatLeft box">
                        <InfoBox restClientHandler={this.restClientHandler} restClient={this.state.restClient}/>
                    </div>
                    <div className="floatLeft box">
                        <ProductList reloadCart={this.reloadCart} restClient={this.state.restClient}/>
                    </div>
                    <div className="floatLeft box">
                        <Cart reload={this.state.reloadCart} restClient={this.state.restClient}/>
                    </div>
                </div>
            </Provider>
        );
    }
}

