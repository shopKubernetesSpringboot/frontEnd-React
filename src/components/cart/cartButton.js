import React from 'react'
import cartIcon from './cart.svg';
import { rest } from "../restClient_axios";
import { restApi_CartAdd } from "../restClient_fetch";

class CartButton extends React.Component {

    restCartAdd() {
        let errorMsg='Can\'t add data to cart!'
        if (this.props.restClient==='Axios')
            rest.post('/add', { item: this.props.product})
                    .then(() => this.props.reloadCart())
                    .catch((onRejectReason) => this.props.errorFnc(errorMsg,onRejectReason))
        else
            restApi_CartAdd(this.props.product).then(
                () => this.props.reloadCart(), //onFullFilled
                (onRejectedReason) => this.props.errorFnc(errorMsg,onRejectedReason))
    }
  
    render() {
        return (
            <button type="button" className="btn btn-primary btn-sm" 
                    onClick={this.restCartAdd.bind(this)}>
                {/* <img src={process.env.PUBLIC_URL + '/cart.webp'} alt="+" class="icon"/> */}
                <img src={cartIcon} alt="+" className="icon"/>
            </button>
        );
    }
  }

export default CartButton