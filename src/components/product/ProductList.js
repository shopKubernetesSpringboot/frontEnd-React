import React from 'react'
import CartButton from '../cart/cartButton'
import { load } from "./restClient";

import { connect } from "react-redux";
import { setError_mapDispatchToProps } from '../../actions/index'

class ProductListRender extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            search: '',
            lastSearch: '',
            products: []
        }
    }

    componentDidMount() {
        this.loadProducts('')
    }

    loadProducts(search) {
        this.props.setError({ msg: '', error: ''});
        const errorMsg='Can\'t load products!';
        load(this.props.restClient,search).then(
          (data) => this.setState({ products: data }),
          (onRejectReason) => this.props.setError({ msg: errorMsg, error: onRejectReason })
        ).catch((error) => this.props.setError({ msg: errorMsg, error: error }))
    }
    
    handleChange(e) {
        const searchValue = e.target.value
        if (this.state.search!==searchValue) {
            this.setState({ search: searchValue})
            this.loadProducts(searchValue)
        }
    }

    render() {
        return (
            <div className="innerBox">
                <center><h4>Product List</h4></center>
                {this.state.products.length>0 && 
                    <div className="sep"><input placeholder="Search for..." value={this.state.search} onChange={(e) => {this.handleChange(e)}}></input></div>
                }
                {this.state.products.map((product) => (
                    <div className="sep" key={product.id}>
                        <div className="floatRight">
                            <CartButton reloadCart={this.props.reloadCart} product={product} restClient={this.props.restClient}/>
                        </div>
                        <div>{product.name}</div>
                    </div>
                ))}
            </div>
        )
    }
}

const ProductList = connect(
    null,
    setError_mapDispatchToProps
  )(ProductListRender);
export default ProductList
  