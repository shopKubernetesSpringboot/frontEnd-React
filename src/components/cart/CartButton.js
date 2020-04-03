import React from 'react'
import cartIcon from './cart.svg';
import { add } from "./restClient";

import { connect } from "react-redux";
import { setError_mapDispatchToProps } from '../../actions/index'

class CartButtonComp extends React.Component {

    restCartAdd() {
        let errorMsg='Can\'t add data to cart!'
        add(this.props.restClient, this.props.product).then(
            () => this.props.reloadCart(),
            (onRejectReason) => this.props.setError({ msg: errorMsg, error: onRejectReason })
        ).catch((error) => this.props.setError({ msg: errorMsg, error: error }))
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