import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Products from './components/products';
import Cart from './components/cart/cart';
import Messages from './components/messages';
import RestClient from './components/restClient';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            error: "",
            reloadCart: false,
            products: [
                { "id": 1, "name": "Product1" },
                { "id": 2, "name": "Product2" },
                { "id": 3, "name": "Product3" },
                { "id": 4, "name": "Product4" },
                { "id": 5, "name": "Product5" },
                { "id": 6, "name": "Product6" },
                { "id": 7, "name": "Product7" },
                { "id": 8, "name": "Product8" },
                { "id": 9, "name": "Product9" },
                { "id": 10, "name": "Product10 large text just to try what happens in the rows for example you know... large text just to try what happens in the rows for example you know" }
            ]
        };

        this.setError = this.setError.bind(this)
        this.reloadCart = this.reloadCart.bind(this)
    }

    setError(msg,e) {
        if (msg===undefined && e===undefined) this.setState({ error: '' })
        else this.setState({ error: msg +'\n' + e.toString() })
    }
    
    reloadCart() {
        this.setState({ reloadCart: true }, this.setState({reloadCart: false}))
    }

    restClientHandler(client) {
        this.setState({restClient: client})
    }

    render() {
        return (
            <div className="main">
                <Messages errorMsg={this.state.error}/>
                <div className="floatLeft box">
                    <div className="innerBox">
                        <div className="floatLeft"><img src={logo} className="App-logo" alt="logo" /></div>
                        <div className="floatLeft padding">
                            <p>Edit <code>src/App.js</code> and save to reload.</p>
                            <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React</a>
                            <hr />
                            <p>Developed by <a href="https://github.com/davidgfolch">David G. Folch</a></p>
                            <p>Icons <a href="https://github.com/danklammer/bytesize-icons">Bootstrap byte-size-icons</a></p>
                            <RestClient handler={this.restClientHandler}/>
                        </div>
                    </div>
                </div>
                <div className="floatLeft box">
                    <Products products={this.state.products} reloadCart={this.reloadCart} restClient={this.state.restClient} errorFnc={this.setError}/>
                </div>
                <div className="floatLeft box">
                    <Cart errorFnc={this.setError} restClient={this.state.restClient} reload={this.state.reloadCart}/>
                </div>
            </div>
        );
    }
}

export default App;
