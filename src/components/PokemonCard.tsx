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
import usePokemonDetails, { PokemonDetails } from "../hooks/usePokemonDetails";
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
      {pokemonError && (<Alert variant="filled" color="error">{pokemonError}</Alert>)}
      {speciesError && (<Alert variant="filled" color="error">{speciesError}</Alert>)}

      <Card className={classes.card}>
        {renderPokemonMedia(pokemonDetails, loading)}
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
              {getFormattedFlavorText(pokemonSpecies)}
            </Typography>
          )}
        </CardContent>
        {renderPokemonTypes(pokemonDetails, pokemonSpecies)}
      </Card>
    </>
  );
};

const renderPokemonMedia = (pokemonDetails: PokemonDetails, loading: boolean) => {
  const classes = useStyles().classes;

  if (loading) {
    return <Skeleton variant="rectangular" height={470} />;
  }
  return (
    pokemonDetails.sprites && (
      <CardMedia
        className={classes.cardMedia}
        image={pokemonDetails.sprites.front_default}
      />
    )
  );
};
const renderPokemonTypes = (pokemonDetails: PokemonDetails, pokemonSpecies: any) => {
  const classes = useStyles().classes;

  if (!pokemonDetails.types) return null;
  const { color } = pokemonSpecies;
  return (
    <CardActions style={{ padding: "0px 0px 20px 25px" }}>
      {pokemonDetails.types.map((type: any, index: number) => (
        <Typography
          key={index}
          variant="caption"
          className={classes.pokeType}
          style={{ backgroundColor: color ? color.name : "black" }}
        >
          {type.type.name}
        </Typography>
      ))}
    </CardActions>
  );
};


const getFormattedFlavorText = (pokemonSpecies: any) => {
  return pokemonSpecies.flavor_text_entries[3].flavor_text.replace(/\/g, "");
};

export default PokemonCard;
