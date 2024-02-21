import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { Pokemon } from "./useFetchPokemons";

interface PokemonSpecies {
  flavor_text_entries: { flavor_text: string }[];
  color: { name: string };
}

const usePokemonSpecies = (pokemon: Pokemon) => {
  const [loading, setLoading] = useState(false);
  const [speciesError, setSpeciesError] = useState("");
  const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies>(
    {} as PokemonSpecies
  );

  useEffect(() => {
    setLoading(true);
    apiClient
      .get(`/pokemon-species/${pokemon.name}`)
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
