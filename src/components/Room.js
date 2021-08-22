import React from "react";
import { Link } from "react-router-dom";
import defaultImg from "../images/room-1.jpeg";
import propTypes from "prop-types";

const Room = ({ room }) => {
  const { name, slug, price, images } = room;
  return (
    <section className="room">
      <div className="img-container">
        <img src={images[0] || defaultImg} alt="Room" />
        <div className="price-top">
          <h6>${price}</h6>
          <p>per night</p>
        </div>
        <Link to={`/rooms/${slug}`} className="btn-primary room-link">
          features
        </Link>
      </div>
      <p className="room-info">{name}</p>
    </section>
  );
};

Room.propTypes = {
  room: propTypes.shape({
    name: propTypes.string.isRequired,
    slug: propTypes.string.isRequired,
    price: propTypes.number.isRequired,
    images: propTypes.arrayOf(propTypes.string).isRequired,
  }),
};

export default Room;
