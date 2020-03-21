import React from 'react'
import CartButton from './cart/cartButton'
// import {CartContext} from '../cart-context';

class Products extends React.Component {

    render() {
        // let cartContext = this.context;
        return (
            <div className="innerBox">
                <center><h4>Product List</h4></center>
                {this.props.products.map((product) => (
                    <div className="sep" key={product.id}>
                        <div className="floatRight">
                            <CartButton updateCartFnc={this.props.updateCartFnc} product={product}/>
                        </div>
                        <div>{product.name}</div>
                    </div>
                ))}
            </div>
        )
    }
}
// Products.contextType = CartContext;

export default Products