import React from "react";
import { withRoomConsumer } from "../Context";
import Loading from "./Loading";
import RoomsFilter from "./RoomsFilter";
import RoomsList from "./RoomsList";

function RoomsContainer({ context }) {
  const { loading, rooms, sortedRooms } = context;
  if (loading) {
    return <Loading />;
  }
  return (
    <React.Fragment>
      <RoomsFilter rooms={rooms} />
      <RoomsList rooms={sortedRooms} />
    </React.Fragment>
  );
}

export default withRoomConsumer(RoomsContainer);

// import React from "react";
// import { RoomConsumer } from "../Context";
// import Loading from "./Loading";
// import RoomsFilter from "./RoomsFilter";
// import RoomsList from "./RoomsList";

// function RoomsContainer() {
//   return (
//     <RoomConsumer>
//       {value => {
//         const { loading, rooms, sortedRooms } = value;
//         if (loading) {
//           return <Loading />;
//         }
//         return (
//           <div>
//             Hello from rooms container
//             <RoomsFilter rooms={rooms} />
//             <RoomsList rooms={sortedRooms} />
//           </div>
//         );
//       }}
//     </RoomConsumer>
//   );
// }

// export default RoomsContainer;
