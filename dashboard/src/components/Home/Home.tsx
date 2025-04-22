import GardenSize from "../Stats/GardenSize";
import TipOfTheDay from "./Tips";

function Home() {
  return (
    <>
      <TipOfTheDay />
      <hr />
      <GardenSize />
    </>
  );
}

export default Home;
