import React from 'react';

const Header = ({toggleBasket, basket}) => {
    return (
        <div className="header">
            <span>
            <img src="/logo.png" />
            </span>
            <span style={{cursor: "pointer"}} onClick={toggleBasket}>
            <img src="basket.svg" />
            <span className="basket_counter">{basket.length}</span>
            </span>
        </div>
    )
}

export default Header;