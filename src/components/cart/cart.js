import React from 'react'
import trashIcon from './trash.svg';
import okIcon from './ok.svg';
import { rest } from "../restClient_axios";
import { restApi_CartClean, restApi_CartList } from "../restClient_fetch";

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
    if (this.props.restClient==='Axios')
        rest.get('/list')
            .then(res => this.setState({ cart: res.data }))
            .catch((onRejectReason) => this.props.errorFnc('Can\'t load cart data!',onRejectReason))
    else
        restApi_CartList().then(
                (data) => this.setState({ cart: data }),
                (onRejectReason) => this.props.errorFnc('Can\'t load cart data! (Fetch)',onRejectReason))
  }

  clean() {
    if (this.props.restClient==='Axios')
      rest.delete('/list')
        .then((res) => this.loadCart())
        .catch((onRejectReason) => this.props.errorFnc('Can\'t add data to cart!',onRejectReason))
    else
      restApi_CartClean().then(
              () => this.loadCart(), //onFullFilled
              (onRejectedReason) => this.props.errorFnc('Can\'t clean cart!',onRejectedReason))
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
