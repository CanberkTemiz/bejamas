import React from 'react';

interface TProduct {
    _id: string
    name: string
    category: string
    price: number
    currency: string
    image: string
    bestseller: boolean
    featured: boolean
    details: string | null
  }

interface TProps {product: TProduct}

const Product = ({product, addCard}) => {
    return (
        <div className="card">  
            <img src={product.image} onClick={() => addCard(product)}/>
            {product.bestseller && (
                <span className="bestseller">Best Seller</span>
            )}
            <span className="hover_add">Add to card</span>
            {/* <p className={`${product.bestseller === true ? "bestseller" : null}`}>Best Seller</p> */}
            <div className="product_info">
                <p className="product_info_cat_name">{product.category}</p>
                <p className="product_info_prod_name">{product.name}</p>
                <p className="product_info_price">${product.price}</p>
            </div>
        </div>
    )
}

export default Product;