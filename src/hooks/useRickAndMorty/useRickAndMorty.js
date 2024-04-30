import { useQuery } from "@tanstack/react-query";
import { getCharacters } from "../../services/rickAndMorty";

const useRickAndMorty = () => {
  const query = useQuery({ queryKey: ["characters"], queryFn: getCharacters });

  return query;
};

export default useRickAndMorty;
