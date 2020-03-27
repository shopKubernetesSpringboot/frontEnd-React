import React from 'react'
import CartButton from './cart/cartButton'

class Products extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            products: [
                { "id": 1, "name": "Product1" },
                { "id": 2, "name": "Product2" },
                { "id": 3, "name": "Product3" },
                { "id": 4, "name": "Product4" },
                { "id": 5, "name": "Product5" },
                { "id": 6, "name": "Product6" },
                { "id": 7, "name": "Product7" },
                { "id": 8, "name": "Product8" },
                { "id": 9, "name": "Product9" },
                { "id": 10, "name": "Product10 large text just to try what happens in the rows for example you know... large text just to try what happens in the rows for example you know" }
            ]
        }
    }


    render() {
        return (
            <div className="innerBox">
                <center><h4>Product List</h4></center>
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

export default Products