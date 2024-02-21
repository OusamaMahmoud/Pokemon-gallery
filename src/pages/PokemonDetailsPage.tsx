import {
  Alert,
  Box,
  Container,
  Grid,
  Typography,
  CircularProgress,
  CardActions,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import usePokemonDetails from "../hooks/usePokemonDetails";
import usePokemonSpecies from "../hooks/usePokemonSpecies";
import useStyles from "../styles";
import PokemonMovies from "../components/PokemonMoves";
import PokemonAbilities from "../components/PokemonAbilities";

const PokemonDetailsPage = () => {
  const classes = useStyles().classes;

  const { slug } = useParams();

  const { pokemonDetails, loading, pokemonError } = usePokemonDetails(slug!);
  const { pokemonSpecies } = usePokemonSpecies(slug!);
  return (
    <>
      {pokemonError && (
        <Alert variant="filled" color="error">
          {pokemonError}
        </Alert>
      )}

      {loading ? (
        <Box boxShadow={4} p={2} borderRadius={2} maxWidth={1000} m="0 auto">
          <CircularProgress
            variant="indeterminate"
            size={200}
            style={{ marginLeft: "200px" }}
          />
        </Box>
      ) : (
        <Box
          boxShadow={4}
          p={2}
          borderRadius={2}
          maxWidth={1400}
          m="130px auto"
        >
          {pokemonDetails && (
            <Grid
              container
              justifyContent={"start"}
              gap={3}
              alignItems={"center"}
            >
              <Grid item>
                {pokemonDetails.sprites && !loading && (
                  <img src={pokemonDetails.sprites.front_default} width={200} />
                )}
              </Grid>
              <Grid item>
                <Typography
                  variant="h3"
                  gutterBottom
                  style={{ textTransform: "capitalize" }}
                >
                  {slug}
                </Typography>
                <Container maxWidth={"sm"}>
                  {pokemonDetails.types && (
                    <CardActions style={{ padding: "0px 0px 20px 0px" }}>
                      <Typography
                        variant="caption"
                        className={classes.pokeType}
                        style={{
                          backgroundColor: `${
                            pokemonSpecies.color
                              ? pokemonSpecies.color.name
                              : "black"
                          }`,
                        }}
                      >
                        {pokemonDetails.types[0]?.type.name}
                      </Typography>

                      {pokemonDetails.types[1] && (
                        <Typography
                          variant="caption"
                          className={classes.pokeType}
                          style={{
                            backgroundColor: `${
                              pokemonSpecies.color
                                ? pokemonSpecies.color.name
                                : "black"
                            }`,
                          }}
                        >
                          {pokemonDetails.types[1]?.type.name || ""}
                        </Typography>
                      )}
                    </CardActions>
                  )}
                </Container>
              </Grid>
            </Grid>
          )}
          <Container maxWidth="xs" style={{ margin: "0px" }}>
            <Button className={classes.detailsPageButton}>Stats</Button>
            <Button className={classes.detailsPageButton}>Moves</Button>
            <Button className={classes.detailsPageButton}>Abilities</Button>
          </Container>

          <Container
            maxWidth={"xs"}
            style={{
              margin: "60px 0 ",
              marginTop: "60px",
            }}
          >
            {pokemonDetails.stats && !loading && (
              <PokemonAbilities qualities={pokemonDetails} />
            )}
          </Container>
        </Box>
      )}
    </>
  );
};

export default PokemonDetailsPage;
