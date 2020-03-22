import React from 'react'
import cartIcon from './cart.svg';
import { restApi_CartAdd } from "../restClient";

class CartButton extends React.Component {

    restCartAdd(product,updateCartFnc) {
        restApi_CartAdd(product)
            .then(
                () => updateCartFnc(), //onFullFilled
                (onRejectedReason) => updateCartFnc('Can\'t add data to cart!',onRejectedReason)
            )
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