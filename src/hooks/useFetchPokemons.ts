import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { useSearchText } from "../contexts/SearchTextContext";

export interface Pokemon {
  name: string;
  url: string;
  id: string;
}

interface FetchPokemonsResponse {
  count: number;
  results: Pokemon[];
}

const useFetchPokemons = (itemsPerPage: number) => {
  const [pokemonsList, setPokemonsList] = useState<Pokemon[]>([]);
  const [noResults, setNoResults] = useState(false);
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [backButton, setBackButton] = useState(false);

  const { searchText } = useSearchText();

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        if (searchText) {
          setLoading(true);
          const response = await apiClient.get<FetchPokemonsResponse>(
            `/pokemon?limit=1025`
          );
          const totalPokemonsCount = response.data.count;
          const filteredPokemons = response.data.results.filter((poke) =>
            poke.name.toLowerCase().includes(searchText.toLowerCase())
          );
          if (filteredPokemons.length === 0) {
            setNoResults(true);
            setTotalPages(1);
            setLoading(false);
            setBackButton(false);
          } else {
            const totalPagesCount = Math.ceil(
              totalPokemonsCount / itemsPerPage
            );
            setTotalPages(totalPagesCount);
            setPokemonsList(filteredPokemons);
            setNoResults(false);
            setLoading(false);
            setBackButton(true);
          }
        } else {
          setLoading(true);
          const response = await apiClient.get<FetchPokemonsResponse>(
            `/pokemon?limit=${itemsPerPage}&offset=${
              (currentPage - 1) * itemsPerPage
            }`
          );
          const totalPokemonsCount = response.data.count;
          const filteredPokemons = response.data.results;
          if (filteredPokemons.length === 0) {
            setNoResults(true);
            setTotalPages(1);
            setLoading(false);
            setBackButton(false);
          } else {
            const totalPagesCount = Math.ceil(
              totalPokemonsCount / itemsPerPage
            );
            setTotalPages(totalPagesCount);
            setPokemonsList(filteredPokemons);
            setNoResults(false);
            setLoading(false);
            setBackButton(false);
          }
        }
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchPokemons();
  }, [searchText ,currentPage, itemsPerPage]);

  return {
    pokemonsList,
    noResults,
    error,
    loading,
    totalPages,
    currentPage,
    setPokemonsList,
    setNoResults,
    setError,
    setLoading,
    setTotalPages,
    setCurrentPage,
    backButton,
  };
};

export default useFetchPokemons;
