import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { Alert, Grid, Typography, Skeleton } from "@mui/material";
import PokemonCard from "./PokemonCard";
import useStyles from "../styles";
import Footer from "./Footer";

export interface Pokemon {
  name: string;
  url: string;
}

interface FetchPokemonsResponse {
  count: number;
  results: Pokemon[];
}
interface Props {
  searchText: string;
}

const PokemonGrid = ({ searchText }: Props) => {
  const classes = useStyles().classes;

  const [pokemonsList, setPokemonsList] = useState<Pokemon[]>([]);
  const [noResults, setNoResults] = useState(false);
  const [error, setError] = useState("");

  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        setLoading(true);
        const response = await apiClient.get<FetchPokemonsResponse>(
          `/pokemon?limit=${itemsPerPage}&offset=${
            (currentPage - 1) * itemsPerPage
          }`
        );
        const totalPokemonsCount = response.data.count;
        const filteredPokemons = response.data.results.filter((poke) =>
          poke.name.toLowerCase().includes(searchText.toLowerCase())
        );
        if (filteredPokemons.length === 0) {
          setNoResults(true);
          setTotalPages(1);
          setLoading(false);
        } else {
          const totalPagesCount = Math.ceil(totalPokemonsCount / itemsPerPage);
          setTotalPages(totalPagesCount);
          setPokemonsList(filteredPokemons);
          setNoResults(false);
          setLoading(false);
        }
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };
    fetchPokemons();
  }, [searchText, currentPage]);
  return (
    <>
      {error && (
        <Alert style={{ margin: "30px 0px" }} severity="error">
          {error}
        </Alert>
      )}
      {noResults && (
        <Typography
          variant="h6"
          style={{
            margin: "30px 200px",
            padding: "20px",
            borderRadius: "5px",
            backgroundColor: "#f05350",
            color: "white",
            width: "350px",
          }}
        >
          No Pokémon found matching "{searchText}".
        </Typography>
      )}
      {!error && !noResults && (
        <>
          {loading ? (
            <Grid container spacing={4}>
              {[1, 2, 3, 4, 5, 6].map((index) => (
                <Grid item key={index} xs={12} sm={6} md={4}>
                  <Skeleton variant="rectangular" width="100%" height={200} />
                  <Skeleton variant="rectangular" width="100%" height={200} />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Grid container spacing={4}>
              {pokemonsList.map((pokemon) => (
                <Grid item key={pokemon.name} xs={12} sm={6} md={4}>
                  <PokemonCard pokemon={pokemon} />
                </Grid>
              ))}
              <Footer
                onPrevious={(current) => setCurrentPage(current)}
                onNext={(current) => setCurrentPage(current)}
                currentPage={currentPage}
                totalPages={totalPages}
              />
              <Typography variant="body2" style={{ marginTop: "10px" }}>
                Page {currentPage} of {totalPages}
              </Typography>
            </Grid>
          )}
        </>
      )}
    </>
  );
};

export default PokemonGrid;
