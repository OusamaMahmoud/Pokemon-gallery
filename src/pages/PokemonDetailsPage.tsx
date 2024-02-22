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
import { useNavigate, useParams } from "react-router-dom";
import usePokemonDetails from "../hooks/usePokemonDetails";
import usePokemonSpecies from "../hooks/usePokemonSpecies";
import useStyles from "../styles";
import PokemonAbilities from "../components/PokemonAbilities";
import { ReactNode, useState } from "react";
import PokemonStats from "../components/PokemonStats";
import PokemonMoves from "../components/PokemonMoves";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import SpinnerWithCounter from "../Spinner";

interface ComponentsMapper {
  [key: string]: ReactNode;
}

const PokemonDetailsPage = () => {
  const navigate = useNavigate();
  const classes = useStyles().classes;
  const { slug: pokemonName } = useParams();
  const [activeComponent, setActiveComponent] = useState("STATS");
  const [activeButton, setActiveButton] = useState("STATS");

  const { pokemonDetails, loading, pokemonError } = usePokemonDetails(
    pokemonName!
  );

  const components: ComponentsMapper = {
    STATS: <PokemonStats qualities={pokemonDetails} />,
    ABILITIES: <PokemonAbilities qualities={pokemonDetails} />,
    MOVES: <PokemonMoves qualities={pokemonDetails} />,
  };
  const handleButtonClick = (componentName: string) => {
    setActiveComponent(componentName);
    setActiveButton(componentName);
  };

  const { pokemonSpecies } = usePokemonSpecies(pokemonName!);

  return (
    <>
      {pokemonError && (
        <Alert variant="filled" color="error">
          {pokemonError}
        </Alert>
      )}
      <Button
        onClick={() => navigate(-1)}
        variant="contained"
        style={{ backgroundColor: "#bb3014", margin: "80px 0 0 126px" }}
      >
        <NavigateBeforeIcon style={{ marginRight: "3px" }} /> BACK
      </Button>

      {loading ? (
        <Box p={2} borderRadius={2} maxWidth={100} m="auto" height={700}>
          <SpinnerWithCounter loading={loading} />
        </Box>
      ) : (
        <Box
          boxShadow={4}
          p={2}
          borderRadius={2}
          maxWidth={1400}
          minHeight={"700px"}
          m="60px auto"
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
                  {pokemonName}
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
            <Button
              style={{
                color: `${activeButton === "STATS" ? "#353be2" : ""}`,
                borderBottom: `${
                  activeButton === "STATS" ? "2px solid #0023c9" : ""
                }`,
              }}
              onClick={() => handleButtonClick("STATS")}
              className={classes.detailsPageButton}
            >
              Stats
            </Button>
            <Button
              style={{
                color: `${activeButton === "MOVES" ? "#353be2" : ""}`,
                borderBottom: `${
                  activeButton === "MOVES" ? "2px solid #0023c9" : ""
                }`,
              }}
              onClick={() => handleButtonClick("MOVES")}
              className={classes.detailsPageButton}
            >
              Moves
            </Button>
            <Button
              style={{
                color: `${activeButton === "ABILITIES" ? "#353be2" : ""}`,
                borderBottom: `${
                  activeButton === "ABILITIES" ? "2px solid #0023c9" : ""
                }`,
              }}
              onClick={() => handleButtonClick("ABILITIES")}
              className={classes.detailsPageButton}
            >
              Abilities
            </Button>
          </Container>

          <Container
            maxWidth={"xs"}
            style={{
              margin: "60px 0 ",
              marginTop: "60px",
            }}
          >
            {pokemonDetails.stats && !loading && components[activeComponent]}
          </Container>
        </Box>
      )}
    </>
  );
};

export default PokemonDetailsPage;
