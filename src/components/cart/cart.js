import React from 'react'
import trashIcon from './trash.svg';
import okIcon from './ok.svg';
import { load, clean } from "./restClient";

class Cart extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
        cart: [],
        reload: props.reload
    }
  }

  componentDidMount() {
    this.loadCart()
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.reload && this.props.reload) this.loadCart()
  }

  loadCart() {
    this.props.errorFnc();
    const errorMsg='Can\'t load cart data!';
    load(this.props.restClient).then(
      (data) => this.setState({ cart: data }),
      (onRejectReason) => this.props.errorFnc(errorMsg,onRejectReason)
    ).catch((error) => this.props.errorFnc(errorMsg,error))
  }

  clean() {
    const errorMsg='Can\'t clean cart!';
    clean(this.props.restClient).then(
      () => this.loadCart(), //onFullFilled
      (onRejectedReason) => this.props.errorFnc(errorMsg,onRejectedReason))
    .catch((onRejectReason) => this.props.errorFnc(errorMsg,onRejectReason))
  }

  render() {
    if (this.state.cart) {
      return (
          <div className="innerBox">
            <center><h4>Cart</h4></center>
            {this.state.cart.length > 0 &&
              <div className="cartSummary">
                <div className="floatRight cartSummary">
                  <button type="button" className="btn btn-primary btn-sm marginRight"
                    onClick={this.clean.bind(this,this.props.updateCartFnc,this.props.restClient)}>
                    <img src={trashIcon} alt="+" className="icon"/>
                  </button>
                  <button type="button" className="btn btn-primary btn-sm">
                    <img src={okIcon} alt="+" className="icon"/>
                  </button>
                </div>
                <strong>
                  <div className="floatLeft cartQuantity">
                    <span>{this.state.cart.reduce(function(sum,item){ return sum + item.quantity; }, 0)}</span>
                  </div>
                  <div className="floatLeft"> Items</div>
                </strong>
                <div className="floatLeft cartQuantity">
                  <span>{this.state.cart.length}</span>
                </div> Products
              </div>
            }
            {this.state.cart.length === 0 &&
              <div className="sep">Cart is empty</div>
            }
            {this.state.cart.map((item) => (
              <div className="sep" key={item.id}>
                <div className="floatLeft cartQuantity">
                  <span>{item.quantity}</span>
                </div>
                {item.name}
              </div>
            ))}
          </div>
      )
    } else {
      return (
        <div className="innerBox">
          <center><h4>Cart</h4></center>
          <div className="sep">Failed to get cart data</div>
        </div>
      )
    }
  }
}

export default Cart
