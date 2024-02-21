import { Pokemon } from "./PokemonGrid";
import useStyles from "../styles";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import apiClient from "../services/api-client";
import { Link } from "react-router-dom";

interface Props {
  pokemon: Pokemon;
}
interface PokemonType {
  slot: number;
  type: { name: string };
}
interface PokemonSpecies {
  flavor_text_entries: { flavor_text: string }[];
  color: { name: string };
}

interface PokemonDetails {
  types: PokemonType[];
  sprites: { front_default: string };
}
const PokemonCard = ({ pokemon }: Props) => {
  const classes = useStyles().classes;

  const [pokemonSpecies, setPokemonSpecies] = useState<PokemonSpecies>(
    {} as PokemonSpecies
  );
  const [pokemonDetails, setPokemonDetails] = useState<PokemonDetails>(
    {} as PokemonDetails
  );

  useEffect(() => {
    apiClient
      .get(`/pokemon-species/${pokemon.name}`)
      .then((res) => setPokemonSpecies(res.data));
  }, []);

  useEffect(() => {
    apiClient
      .get(`/pokemon/${pokemon.name}`)
      .then((res) => setPokemonDetails(res.data));
  }, []);
  return (
    <Card className={classes.card}>
      {pokemonDetails.sprites && (
        <CardMedia
          className={classes.cardMedia}
          image={`${pokemonDetails.sprites.front_default}`}
        />
      )}
      <CardContent className={classes.cardContent}>
        <Typography
          variant="h5"
          gutterBottom
          style={{ fontWeight: "500", textTransform: "capitalize" }}
        >
          <Link to={`/pokemonDetailsPage/${pokemon.name}`}>{pokemon.name}</Link>
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
  );
};

export default PokemonCard;
