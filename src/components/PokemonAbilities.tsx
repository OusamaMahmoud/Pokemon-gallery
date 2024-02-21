import { Container, Grid } from "@mui/material";
import useStyles from "../styles";
import { PokemonDetails } from "../hooks/usePokemonDetails";

interface Props {
  qualities: PokemonDetails;
}
const PokemonAbilities = ({ qualities }: Props) => {
  const classes = useStyles().classes;
  return (
    <Container
      maxWidth={"xs"}
      style={{
        margin: "0px",
      }}
      className={classes.scrollableContainer}
    >
      {qualities &&
        qualities.abilities.map(({ ability }, index) => (
          <Grid container justifyContent={"space-between"}>
            <Grid
              item
              style={{
                borderRight: "2px solid red",
                minWidth: "120px",
                paddingBottom: "18px",
                textTransform: "capitalize",
                fontWeight: "600",
                color: "#333333",
              }}
            >
              Ability {index + 1}
            </Grid>
            <Grid item style={{ color: "#666666" }}>
              {ability.name}
            </Grid>
          </Grid>
        ))}
    </Container>
  );
};

export default PokemonAbilities;
