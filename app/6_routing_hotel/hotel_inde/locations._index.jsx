/*import { useLoaderData } from "@remix-run/react";
import { getHotels } from "../api/hotel";

export async function loader() {
  let hotelList = await getHotels();
  console.log(hotelList);
  return hotelList;
}

export default function Locations() {
  const hotelList = useLoaderData();

  return (
    <main>
      <h1>Our hotels</h1>

      {hotelList.map((hotel) => (
        <h1>{hotel.city}</h1>
      ))}
    </main>
  );
}
*/
