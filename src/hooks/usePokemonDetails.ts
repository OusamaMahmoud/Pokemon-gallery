import { useState, useEffect } from "react";
import apiClient from "../services/api-client";

export interface Stat {
  base_stat: number;
  stat: { name: string };
}

interface Move {
  move: { name: string };
}
interface Ability {
  ability: { name: string };
}

export interface PokemonDetails {
  types: PokemonType[];
  sprites: { front_default: string };
  stats: Stat[];
  moves: Move[];
  abilities: Ability[];
  id:number;
  name:string;
}
interface PokemonType {
  slot: number;
  type: { name: string };
}
const usePokemonDetails = (pokemonId: string) => {
  const [loading, setLoading] = useState(false);
  const [pokemonError, setPokemonError] = useState("");

  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails>(
    {} as PokemonDetails
  );
  useEffect(() => {
    setLoading(true);
    apiClient
      .get(`/pokemon/${pokemonId}`)
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
