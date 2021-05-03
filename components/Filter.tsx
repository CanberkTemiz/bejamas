import React from 'react';

const Filter = ({categories, prices, handleCategoryFilter, handlePriceFilter, selectedPrice, visible, toggleFilter}) => {

    return (
      <div className={`filters_wrapper ${visible}`}>

        <div>
          {visible && (
            <p style={{cursor: "pointer"}} onClick={() => toggleFilter()}>X</p>
          )}

          
          <p>Category</p>
          <div className="category_filters">
            <ul>
              {categories.map((category,index) => (
                <li key={index}>
                  <label>
                    <input onClick={() => handleCategoryFilter(category)} value={category} type="checkbox" />
                    {category}
                  </label>
                </li>
              ))}
            </ul>
          </div>

          <p>Price range</p>
          <div className="price_filters">
            <ul>
              {Object.keys(prices).map((key, index) => (
                <li key={index}>
                  <label>
                    <input checked={selectedPrice === key} onChange={handlePriceFilter} value={key} type="checkbox"/>
                    {prices[key]}
                  </label>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
}

export default Filter;