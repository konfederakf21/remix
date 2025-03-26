/*

export const meta = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export async function loader() {
  let contactList = "";
  contactList = await getTasks();
  return contactList;
}

export default function Index() {
  let contactList = useLoaderData();

  return (
    <>
      <Header3 />
      <AddFood action={"/newFood"} />
      {foodList.map((food) => (
        <Food
          image={food.image}
          title={food.title}
          price={food.price}
        />
      ))}
    </>
  );
}
*/
