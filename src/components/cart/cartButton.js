import React from 'react'
import cartIcon from './cart.svg';
import { rest } from "../restClient_axios";
import { restApi_CartAdd } from "../restClient_fetch";

class CartButton extends React.Component {

    restCartAdd(product,restClient,reloadCart,errorFnc) {
        if (restClient==='Axios')
            rest.post('/add', { item: product})
                    .then((res) => reloadCart())
                    .catch((onRejectReason) => errorFnc('Can\'t add data to cart!',onRejectReason))
        else
            restApi_CartAdd(product).then(
                () => reloadCart(), //onFullFilled
                (onRejectedReason) => errorFnc('Can\'t add data to cart!',onRejectedReason))
    }
  
    render() {
        return (
            <button type="button" className="btn btn-primary btn-sm" 
                    onClick={this.restCartAdd.bind(this,this.props.product,this.props.restClient,this.props.reloadCart,this.props.errorFnc)}>
                {/* <img src={process.env.PUBLIC_URL + '/cart.webp'} alt="+" class="icon"/> */}
                <img src={cartIcon} alt="+" className="icon"/>
            </button>
        );
    }
  }

export default CartButton