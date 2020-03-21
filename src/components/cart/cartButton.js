import React from 'react'
import cartIcon from './cart.svg';

class CartButton extends React.Component {

    restCartAdd(product,updateCartFnc) {
        fetch('http://localhost:8080/cart/add', {
            method: 'POST',
            credentials: "include",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Basic '+btoa('user:user')
            },
            body: '{ "item": '+JSON.stringify(product) +'}'
        }).then(res => res.json()
        ).then((data) => {
            updateCartFnc()
        }).catch(console.log)
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