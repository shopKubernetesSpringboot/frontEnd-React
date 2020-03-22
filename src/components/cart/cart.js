import React from 'react'
import trashIcon from './trash.svg';
import okIcon from './ok.svg';

class Cart extends React.Component {

  render() {
    if (this.props.cart) {
      return (
          <div className="innerBox">
            <center><h4>Cart</h4></center>
            {this.props.cart.length > 0 &&
              <div className="sep">
                <button type="button" className="btn btn-primary btn-sm marginRight">
                  <img src={trashIcon} alt="+" className="icon"/>
                </button>
                <button type="button" className="btn btn-primary btn-sm">
                  <img src={okIcon} alt="+" className="icon"/>
                </button>
              </div>
            }
            {this.props.cart.map((item) => (
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
