import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import Banner from "../components/Banner";
import defaultBg from "../images/defaultBcg.jpeg";
import { Link } from "react-router-dom";
import { RoomContext } from "../Context";
import StyledHero from "../components/StyledHero";

class SingleRoom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      slug: this.props.match.params.slug,
      defaultBg,
    };
  }
  static contextType = RoomContext;

  render() {
    const { getRoom } = this.context;
    const room = getRoom(this.state.slug);
    if (!room) {
      return (
        <div className="error">
          <h3>no such room could be found...</h3>
          <Link to="/rooms" className="btn-primary">
            back to rooms
          </Link>
        </div>
      );
    }
    const {
      name,
      price,
      size,
      description,
      images,
      extras,
      capacity,
      breakfast,
      pets,
    } = room;
    const [ mainImg, ...defaultImgs ] = images;

    return (
      <React.Fragment>
        <StyledHero img={mainImg}>
          <Banner title={`${name} room`}>
            <Link to="/rooms" className="btn-primary">
              back to rooms
            </Link>
          </Banner>
        </StyledHero>
        <section className="single-room">
          <div className="single-room-images">
            {defaultImgs.map(image => {
              return <img key={uuidv4()} src={image} alt={name} />;
            })}
          </div>
          <div className="single-room-info">
            <article className="desc">
              <h3>details</h3>
              <p>{description}</p>
            </article>
            <article className="info">
              <h3>info</h3>
              <h6>price : ${price}</h6>
              <h6>size : {size} SQFT</h6>
              <h6>
                max capacity :{" "}
                {capacity > 1 ? `${capacity} people` : `${capacity} person`}
              </h6>
              <h6>{pets ? "pets allowed" : "no pets allowed"}</h6>
              <h6>{breakfast && "free breakfast included"}</h6>
            </article>
          </div>
        </section>
        <section className="room-extras">
          <h6>extras</h6>
          <ul className="extras">
            {extras.map(item => {
              return <li key={uuidv4()}>- {item}</li>;
            })}
          </ul>
        </section>
      </React.Fragment>
    );
  }
}

export default SingleRoom;
