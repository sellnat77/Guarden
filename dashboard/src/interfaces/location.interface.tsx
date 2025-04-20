import Plant from "./plant.interface";

interface Location {
  id: string;
  name: string;
  description: string;
  thumbnailPath: string;
  thumbnailDescription: string;
  plants?: Plant[] | undefined;
}

export default Location;
