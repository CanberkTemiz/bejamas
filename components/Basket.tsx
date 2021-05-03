import React from 'react';

const Basket = ({basket, toggleBasket, handleClearBasket}) => {
    return (
        <div className="basket_list">
          <span onClick={() => toggleBasket()} style={{fontSize: 40, cursor: "pointer"}}>&#10005;</span>
            {basket.map(item => (
              <div className="basket_list_product">  
                <div>
                  <p style={{fontStyle: "normal", fontWeight: "bold", fontSize: "20px", lineHeight: "22px"}}>{item.name}</p>
                  <p style={{fontStyle: "normal", fontWeight: "normal", fontSize: "29px", lineHeight: "32px"}}>${item.price}</p>
                </div>
                <img src={item.image}/>
              </div>
            ))}
          <hr />
          <button style={{cursor: "pointer"}}onClick={() => handleClearBasket()}>CLEAR</button>
        </div>
    )
}

export default Basket;