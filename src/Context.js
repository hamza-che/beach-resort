import React, { Component } from "react";
// import items from "./data";
import Client from "./Contentful";

const RoomContext = React.createContext();

class RoomProvider extends Component {
  state = {
    rooms: [],
    featuredRooms: [],
    sortedRooms: [],
    loading: true,
    type: "all",
    capacity: 1,
    price: 0,
    minPrice: 0,
    maxPrice: 0,
    minSize: 0,
    maxSize: 0,
    breakfast: false,
    pets: false,
  };

  getData = async () => {
    try {
      let response = await Client.getEntries({
        content_type: "beachResort",
        order: "fields.price",
      });
      let rooms = this.formatedData(response.items);
      let featuredRooms = rooms.filter(room => room.featured);
      let maxPrice = Math.max(...rooms.map(item => item.price));
      let maxSize = Math.max(...rooms.map(item => item.size));
      this.setState({
        rooms,
        featuredRooms,
        sortedRooms: rooms,
        loading: false,
        price: maxPrice,
        maxPrice,
        maxSize,
      });
    } catch (error) {
      console.log(error);
    }
  };

  componentDidMount() {
    this.getData();
  }

  formatedData = items => {
    let tempItems = items.map(item => {
      let id = item.sys.id;
      let images = item.fields.images.map(image => image.fields.file.url);
      let room = { ...item.fields, images, id };
      return room;
    });
    return tempItems;
  };

  getRoom = slug => {
    let tempRooms = [ ...this.state.rooms ];
    let room = tempRooms.find(room => room.slug === slug);
    return room;
  };

  handleChange = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = e.target.name;
    this.setState(
      {
        [name]: value,
      },
      this.filterRooms
    );
  };

  filterRooms = () => {
    let {
      rooms,
      price,
      maxSize,
      minSize,
      pets,
      breakfast,
      type,
      capacity,
    } = this.state;

    // All rooms
    let tempRooms = [ ...rooms ];
    // Transform values
    capacity = parseInt(capacity);
    price = parseInt(price);
    // Filter by type
    if (type !== "all")
      tempRooms = tempRooms.filter(room => room.type === type);
    // Filter by capacity
    if (capacity !== 1)
      tempRooms = tempRooms.filter(room => room.capacity >= capacity);
    // Filter by price
    tempRooms = tempRooms.filter(room => room.price <= price);
    // Filter by size
    tempRooms = tempRooms.filter(
      room => room.size <= maxSize && room.size >= minSize
    );
    // Filter by breakfast
    if (breakfast) tempRooms = tempRooms.filter(room => room.breakfast);
    // Filter by pets
    if (pets) tempRooms = tempRooms.filter(room => room.pets);

    // Change the state
    this.setState({
      sortedRooms: tempRooms,
    });
  };

  render() {
    return (
      <RoomContext.Provider
        value={{
          ...this.state,
          getRoom: this.getRoom,
          handleChange: this.handleChange,
        }}
      >
        {this.props.children}
      </RoomContext.Provider>
    );
  }
}

const RoomConsumer = RoomContext.Consumer;

export function withRoomConsumer(Component) {
  return function ConsumerWrapper(props) {
    return (
      <RoomConsumer>
        {value => <Component {...props} context={value} />}
      </RoomConsumer>
    );
  };
}

export { RoomContext, RoomProvider, RoomConsumer };
