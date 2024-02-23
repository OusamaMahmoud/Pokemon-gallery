import { Alert, Grid, Typography, Skeleton, Button } from "@mui/material";
import PokemonCard from "./PokemonCard";
import Footer from "./Footer";
import useFetchPokemons from "../hooks/useFetchPokemons";
import { useEffect } from "react";
import { useSearchText } from "../contexts/SearchTextContext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";

const PokemonGrid = () => {
  const { searchText, setSearchText } = useSearchText();

  const {
    currentPage,
    error,
    loading,
    noResults,
    pokemonsList,
    setCurrentPage,
    totalPages,
    backButton,
  } = useFetchPokemons(6);

  useEffect(() => {
    if (localStorage.getItem("currentPage")) {
      const pageInStorage = localStorage.getItem("currentPage");
      if (pageInStorage) {
        setCurrentPage(parseInt(pageInStorage, 10));
      }
    }
  }, [setCurrentPage]);

  const handlePageChangeButtons = (page: number) => {
    setCurrentPage(page);
    localStorage.setItem("currentPage", page.toString());
  };
  return (
    <>
      {backButton && (
        <Button
          onClick={() => {
            setSearchText("");
          }}
          variant="contained"
          style={{
            backgroundColor: "#bb3014",
            marginBottom: "20px",
          }}
        >
          <NavigateBeforeIcon style={{ marginRight: "3px" }} /> Back
        </Button>
      )}
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
                  <Skeleton variant="rectangular" width="100%" height={300} />
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
              {!backButton && (
                <>
                  <Footer
                    onPrevious={(page) => handlePageChangeButtons(page)}
                    onNext={(page) => handlePageChangeButtons(page)}
                    currentPage={currentPage}
                    totalPages={totalPages}
                  />
                  <Typography variant="body2" style={{ marginTop: "10px" }}>
                    Page {currentPage} of {totalPages}
                  </Typography>
                </>
              )}
            </Grid>
          )}
        </>
      )}
    </>
  );
};

export default PokemonGrid;
