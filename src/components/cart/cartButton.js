import React from 'react'
import cartIcon from './cart.svg';
import { rest } from "../restClient_axios";
import { restApi_CartAdd } from "../restClient_fetch";

import { connect } from "react-redux";
import { setError_mapDispatchToProps } from '../../actions/index'

class CartButtonComp extends React.Component {

    restCartAdd() {
        let errorMsg='Can\'t add data to cart!'
        if (this.props.restClient==='Axios')
            rest.post('/add', { item: this.props.product})
                    .then(() => this.props.reloadCart())
                    .catch((error) => this.props.setError({ msg: errorMsg, error: error }))
        else
            restApi_CartAdd(this.props.product).then(
                () => this.props.reloadCart(), //onFullFilled
                (onRejectReason) => this.props.setError({ msg: errorMsg, error: onRejectReason }))
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

  const CartButton = connect(
    null,
    setError_mapDispatchToProps
  )(CartButtonComp);
  export default CartButton