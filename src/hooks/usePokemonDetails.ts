import { useState, useEffect } from "react";
import apiClient from "../services/api-client";
import { Pokemon } from "./useFetchPokemons";
interface PokemonDetails {
  types: PokemonType[];
  sprites: { front_default: string };
}
interface PokemonType {
  slot: number;
  type: { name: string };
}
const usePokemonDetails = (pokemon: Pokemon) => {
  const [loading, setLoading] = useState(false);
  const [pokemonError, setPokemonError] = useState("");

  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails>(
    {} as PokemonDetails
  );
  useEffect(() => {
    setLoading(true);
    apiClient
      .get(`/pokemon/${pokemon.name}`)
      .then((res) => {
        setPokemonDetails(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setPokemonError(err);
        setLoading(false);
      });
  }, []);

  return { pokemonDetails, setPokemonDetails, loading, pokemonError };
};

export default usePokemonDetails;
