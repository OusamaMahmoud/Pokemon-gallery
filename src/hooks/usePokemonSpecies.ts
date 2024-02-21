import { useEffect, useState } from "react";
import apiClient from "../services/api-client";

interface PokemonSpecies {
  flavor_text_entries: { flavor_text: string }[];
  color: { name: string };
}

const usePokemonSpecies = (pokemonName: string) => {
  const [loading, setLoading] = useState(false);
  const [speciesError, setSpeciesError] = useState("");
  const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies>(
    {} as PokemonSpecies
  );

  useEffect(() => {
    setLoading(true);
    apiClient
      .get(`/pokemon-species/${pokemonName}`)
      .then((res) => {
        setPokemonSpecies(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setSpeciesError(err);
        setLoading(false);
      });
  }, []);

  return { pokemonSpecies, setPokemonSpecies, loading, speciesError };
};

export default usePokemonSpecies;
