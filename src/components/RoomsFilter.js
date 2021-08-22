import React, { useContext } from "react";
import { RoomContext } from "../Context";
import { v4 as uuidv4 } from "uuid";
import Title from "./Title";

// Get Unique Value
let getUnique = (items, value) => {
  return [ ...new Set(items.map(item => item[value])) ];
};

function RoomsFilter({ rooms }) {
  const context = useContext(RoomContext);
  const {
    handleChange,
    type,
    capacity,
    price,
    minSize,
    maxSize,
    minPrice,
    maxPrice,
    breakfast,
    pets,
  } = context;

  // Get Unique Types
  let types = getUnique(rooms, "type");
  types = [ "all", ...types ];
  types = types.map(type => (
    <option key={uuidv4()} value={type}>
      {type}
    </option>
  ));

  // Get Unique Capacities
  let people = getUnique(rooms, "capacity");
  people = people.map(item => (
    <option key={uuidv4()} value={item}>
      {item}
    </option>
  ));

  return (
    <section className="filter-container">
      <Title title="serach rooms" />
      <form className="filter-form">
        {/* Select Type */}
        <div className="form-group">
          <label htmlFor="type">room type</label>
          <select
            name="type"
            id="type"
            value={type}
            className="form-control"
            onChange={handleChange}
          >
            {types}
          </select>
        </div>
        {/* End Select Type */}
        {/* Guests */}
        <div className="form-group">
          <label htmlFor="type">guests</label>
          <select
            name="capacity"
            id="capacity"
            value={capacity}
            className="form-control"
            onChange={handleChange}
          >
            {people}
          </select>
        </div>
        {/* End Guests */}
        {/* Room price */}
        <div className="form-group">
          <label htmlFor="price">room price ${price}</label>
          <input
            type="range"
            name="price"
            id="price"
            value={price}
            min={minPrice}
            max={maxPrice}
            className="form-control"
            onChange={handleChange}
          />
        </div>
        {/* End Room price */}
        {/* Size */}
        <div className="form-group">
          <label htmlFor="size">room size</label>
          <div className="size-inputs">
            <input
              type="number"
              name="minSize"
              id="size"
              value={minSize}
              onChange={handleChange}
              className="size-input"
            />
            <input
              type="number"
              name="maxSize"
              id="size"
              value={maxSize}
              onChange={handleChange}
              className="size-input"
            />
          </div>
        </div>
        {/* End Size */}
        {/* Extras */}
        <div className="form-group">
          <div className="single-extra">
            <input
              type="checkbox"
              id="breakfast"
              name="breakfast"
              checked={breakfast}
              onChange={handleChange}
            />
            <label htmlFor="breakfast">breakfast</label>
          </div>
          <div className="single-extra">
            <input
              type="checkbox"
              id="pets"
              name="pets"
              checked={pets}
              onChange={handleChange}
            />
            <label htmlFor="pets">pets</label>
          </div>
        </div>
        {/* End Extras */}
      </form>
    </section>
  );
}

export default RoomsFilter;
