import React from 'react'
import CartButton from '../cart/CartButton'
import { load, insert } from "./restClient";

import { connect } from "react-redux";
import { setError_mapDispatchToProps } from '../../actions/index'

class ProductListComp extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            search: '',
            products: props.products  //initialization just for testing
        }
    }

    componentDidMount() {
        this.loadProducts('')
    }

    loadProducts() {
        this.props.setError({ msg: '', error: '' });
        const errorMsg = 'Can\'t load products!';
        load(this.props.restClient, this.state.search)
            .then(
                (data) => this.setState({ products: data }),
                (onRejectReason) => this.props.setError({ msg: errorMsg, error: onRejectReason })
            ).catch((error) => this.props.setError({ msg: errorMsg, error: error }))
    }
    insertProducts() {
        this.props.setError({ msg: '', error: '' });
        const errorMsg = 'Can\'t insert products!';
        insert(this.props.restClient)
            .then(
                (data) => this.loadProducts(),
                (onRejectReason) => this.props.setError({ msg: errorMsg, error: onRejectReason })
            ).catch((error) => this.props.setError({ msg: errorMsg, error: error }))
    }

    handleChange(e) {
        const searchValue = e.target.value
        this.setState({ search: searchValue }, () => this.loadProducts())
    }

    render() {
        if (this.state.products) {
            return (
                <div className="innerBox">
                    <center><h4>Product List</h4></center>
                    <div className="summary">
                        <div className="floatRight">
                            <button type="button" className="btn btn-primary btn-sm" onClick={this.loadProducts.bind(this)} id="reloadProducts">
                                <img src={process.env.PUBLIC_URL + '/icons/reload.svg'} alt="reload" className="icon" />
                            </button>
                        </div>
                        <button type="button" className="btn btn-primary btn-sm marginRight"><img src={process.env.PUBLIC_URL + '/icons/search.svg'} alt="search" className="icon"/></button>
                        <input placeholder="Search for..." value={this.state.search} onChange={(e) => { this.handleChange(e) }}></input>
                    </div>
                    {this.state.products.length === 0 &&
                        <div className="sep" onClick={this.insertProducts.bind(this)}>No products found, click to create products!</div>
                    }
                    {this.state.products.map((product) => (
                        <div className="sep" key={product.id}>
                            <div className="floatRight">
                                <CartButton reloadCart={this.props.reloadCart} product={product} restClient={this.props.restClient} />
                            </div>
                            <div className="floatLeft productPicture">
                                <img src={process.env.PUBLIC_URL + '/' + (product.image ? 'product/' + product.id + '_icon.png' : 'icons/photo.svg')} alt="prodImg" className="icon" />
                            </div>
                            <div className="productName">{product.name}</div>
                        </div>
                    ))}
                </div>
            )
        } else {
            return (
                <div className="innerBox">
                    <center><h4 onClick={this.loadProducts.bind(this)}>Product List</h4></center>
                    <div className="sep">Failed to get products data</div>
                </div>
            )
        }
    }
}

const ProductList = connect(
    null,
    setError_mapDispatchToProps
)(ProductListComp);
export default ProductList
