import React from 'react'

import classes from './Product.module.css'

const Product = (props) => {
    let expired = props.productData.is_expire? <p className="text-danger">Expired</p> : <p>Not Expired</p>

    return (
        <div className={[classes.content, "px-3"].join(" ")}>
            <img src={ props.productData.cover_image } alt="" />
            <h3>{ props.productData.name }</h3>
            <p>Expiring: { props.productData.expiry_date }</p>
            { expired }
            <h6>Price: ${ props.productData.price }</h6>
            <h6>Discount: -${ props.productData.discount_price }</h6>
        </div>
    );
}

export default Product;