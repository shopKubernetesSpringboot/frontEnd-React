import React, { Component } from 'react';
import './App.css';
import ProductList from './components/product/ProductList';
import Cart from './components/cart/CartList';
import MessagesRedux from './components/Messages';
import InfoBox from './components/InfoBox';

import { createStore } from 'redux'
import { Provider } from 'react-redux'

import rootReducer from './reducers'
import { AXIOS } from './components/RestClient';


export default class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: "",
            reloadCart: false,
            restClient: AXIOS
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
                    <MessagesRedux/>

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

