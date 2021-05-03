import React from "react";

const Banner = ({featured, addToCard}) => {
  return (
    <div className="banner">
      <div className="banner_header">
        <div className="title">{featured?.name}</div>
        <div style={{ marginTop: 58 }}>
          <button onClick={() => addToCard(featured)} className="add_card_button">Add to card</button>
        </div>
      </div>

      <div className="banner_wrapper">
        <img className="banner_image" src={featured?.image} />
        <div className="small">Photo of the day</div>
      </div>

      <div className="banner_details">
        <div className="left">
          <p className="left_title">About {featured?.name}</p>
          <p style={{ color: "#656565", fontSize: "22px", lineHeight: "24px" }}>
            Pets
          </p>
          <div className="left_details">
            <p>
              {featured?.description}
            </p>
          </div>
        </div>

        <div className="right">
          <p className="left_title">People also buy</p>
          <div className="small_images">
            <img src="https://images.pexels.com/photos/2633986/pexels-photo-2633986.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
            <img src="https://images.pexels.com/photos/3685523/pexels-photo-3685523.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
            <img src="https://images.pexels.com/photos/279480/pexels-photo-279480.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260" />
          </div>

          <div className="right_details">
            <span className="right_details_title">Details</span>
            <p>Size: 1020 x 1020 pixel</p>
            <p>Size: 15 mb</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
