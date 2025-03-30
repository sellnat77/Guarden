import Plant from "./plant.interface";

interface Location {
  id: string;
  title: string;
  description: string;
  thumbnailPath: string;
  thumbnailDescription: string;
  plants?: Plant[] | undefined;
}

export default Location;
