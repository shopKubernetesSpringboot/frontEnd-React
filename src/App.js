import React, {Component} from 'react';
import logo from './logo.svg';
import './App.css';
import Products from './components/products';
import Cart from './components/cart/cart';
import restApiLoadCart from './components/restClient';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
        error: "",
        cart: [],
        products: [
          { "id": 1, "name": "Product1"},
          { "id": 2, "name": "Product2"},
          { "id": 3, "name": "Product3"},
          { "id": 4, "name": "Product4"},
          { "id": 5, "name": "Product5"},
          { "id": 6, "name": "Product6"},
          { "id": 7, "name": "Product7"},
          { "id": 8, "name": "Product8"},
          { "id": 9, "name": "Product9"},
          { "id": 10, "name": "Product10 laaarge text just to try what happends in the rows for example you know... laaarge text just to try what happends in the rows for example you know"}
        ]
      };

    this.loadCart = this.loadCart.bind(this)
  }

  loadCart() {
    this.setState({error: ''});
    restApiLoadCart()
        .then((data) => this.setState(state => ({cart: data})))
        .catch(e => this.setState({error: 'Can\'t load cart data! '+e.toString()}));
  }

  componentDidMount() {
    this.loadCart()
  }

  render() {
    return (
      <div className="main">
        {this.state.error.length>0 &&
            <div className="alert alert-danger" role="alert" id="errorDiv">{this.state.error}</div>
        }
        <div className="floatLeft box">
            <div className="innerBox">
                <div className="floatLeft"><img src={logo} className="App-logo" alt="logo" /></div>
                <div className="floatLeft padding"> 
                    <p>Edit <code>src/App.js</code> and save to reload.</p>
                    <a href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React</a>
                    <hr/>
                    <p>Developed by <a href="https://github.com/davidgfolch">David G. Folch</a></p>
                    <p>Icons <a href="https://github.com/danklammer/bytesize-icons">Bootstrap bytesize-icons</a></p>
                </div>
            </div>
        </div>
        <div className="floatLeft box">
            <Products products={this.state.products} updateCartFnc={this.loadCart}/>
        </div>
        <div className="floatLeft box">
            <Cart cart={this.state.cart}/>
        </div>
    </div>
    );
  }
}

export default App;
