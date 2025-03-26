/*import { useLoaderData } from "@remix-run/react";
import { getRoomData } from "../api/room.js";

export async function loader({ params }) {
  const roomId = params.id;

  const roomData = await getRoomData(roomId);
  return roomData[0];
}

export default function Detail() {
  const room = useLoaderData();

  return (
    <main>
      <h1>Detail pokoje {room.title}</h1>
      <p>Cena: {room.price} €</p>
    </main>
  );
}
*/
