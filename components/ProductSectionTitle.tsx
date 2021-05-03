import React, {useState} from 'react';
import Filter from './Filter';

const ProductSectionTitle = ({handleSortAscSelect, handleSortSelect, toggleFilter}) => {


    return (
        <div className="titles">
          <div className="title_section">
            <p style={{ fontWeight: "bold" }}>Photography</p>
            <p style={{ color: "#9B9B9B" }}> / Premium Photos</p>
          </div>

          <img onClick={() => toggleFilter()} className="filter_icon" src="/filter_icon.svg" />

          <div className="sorting_section">
            <img onClick={() => handleSortAscSelect(1)} src="/sortdown.svg" />
            <img onClick={() => handleSortAscSelect(-1)} src="/sortup.svg" />
            <span style={{ color: "#9B9B9B" }}>Sortby</span>
            <select onChange={handleSortSelect}>
              <option value="price">Price</option>
              <option value="name">Name</option>
            </select>
          </div>
      </div>
    )
}

export default ProductSectionTitle;