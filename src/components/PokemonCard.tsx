import useStyles from "../styles";
import {
  Alert,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Skeleton,
  Typography,
} from "@mui/material";
import { Link } from "react-router-dom";
import usePokemonDetails from "../hooks/usePokemonDetails";
import usePokemonSpecies from "../hooks/usePokemonSpecies";
import { Pokemon } from "../hooks/useFetchPokemons";

interface Props {
  pokemon: Pokemon;
}

const PokemonCard = ({ pokemon }: Props) => {
  const classes = useStyles().classes;
  const { pokemonDetails, pokemonError } = usePokemonDetails(pokemon.name);

  const { pokemonSpecies, loading, speciesError } = usePokemonSpecies(
    pokemon.name
  );

  return (
    <>
      {pokemonError && (
        <Alert variant="filled" color="error">
          {pokemonError}
        </Alert>
      )}
      {speciesError && (
        <Alert variant="filled" color="error">
          {speciesError}
        </Alert>
      )}

      <Card className={classes.card}>
        {loading && <Skeleton width={400} height={300} />}
        {pokemonDetails.sprites && !loading && (
          <CardMedia
            className={classes.cardMedia}
            image={pokemonDetails.sprites.front_default}
          />
        )}
        <CardContent className={classes.cardContent}>
          <Typography
            variant="h5"
            gutterBottom
            style={{ fontWeight: "500", textTransform: "capitalize" }}
          >
            <Link
              to={`/pokemonDetailsPage/${pokemon.name}`}
              style={{ textDecoration: "none", color: "black" }}
            >
              {pokemon.name}
            </Link>
          </Typography>
          {pokemonSpecies.flavor_text_entries && (
            <Typography paragraph color={"textSecondary"}>
              {pokemonSpecies.flavor_text_entries[3].flavor_text.replace(
                /\/g,
                ""
              )}
            </Typography>
          )}
        </CardContent>
        {pokemonDetails.types && (
          <CardActions style={{ padding: "0px 0px 20px 25px" }}>
            <Typography
              variant="caption"
              className={classes.pokeType}
              style={{
                backgroundColor: `${
                  pokemonSpecies.color ? pokemonSpecies.color.name : "black"
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
                    pokemonSpecies.color ? pokemonSpecies.color.name : "black"
                  }`,
                }}
              >
                {pokemonDetails.types[1]?.type.name || ""}
              </Typography>
            )}
          </CardActions>
        )}
      </Card>
    </>
  );
};

export default PokemonCard;
