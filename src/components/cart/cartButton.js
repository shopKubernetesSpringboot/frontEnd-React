import React from 'react'
import cartIcon from './cart.svg';
import { restApiCartAdd } from "../restClient";

class CartButton extends React.Component {

    restCartAdd(product,updateCartFnc) {
        restApiCartAdd(product)
            .then(
                () => updateCartFnc(), //onFullFilled
                (onRejectedReason) => updateCartFnc('Can\'t add data to cart!',onRejectedReason)
            )
            // .catch(e => updateCartFnc('Can\'t add data to cart!',e))
    }
  
    render() {
        return (
            <button type="button" className="btn btn-primary btn-sm" 
                    onClick={this.restCartAdd.bind(this,this.props.product,this.props.updateCartFnc)}>
                {/* <img src={process.env.PUBLIC_URL + '/cart.webp'} alt="+" class="icon"/> */}
                <img src={cartIcon} alt="+" className="icon"/>
            </button>
        );
    }
  }

export default CartButton