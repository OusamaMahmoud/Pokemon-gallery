import { Container, Grid } from "@mui/material";
import { PokemonDetails } from "../hooks/usePokemonDetails";
import useStyles from "../styles";

interface Props {
  qualities: PokemonDetails;
}

const PokemonMoves = ({ qualities }: Props) => {
  const classes = useStyles().classes;

  return (
    <>
      <Container 
           maxWidth={"xs"}
           style={{
             margin: "0px",
           }}
           className={classes.scrollableContainer}
           >
        {qualities &&
          qualities.moves.map(({ move }, index) => (
            <Grid container justifyContent={"space-between"}>
              <Grid
                item
                style={{
                  borderRight: "2px solid red",
                  minWidth: "120px",
                  paddingBottom: "18px",
                  textTransform: "capitalize",
                  fontWeight: "600",
                  color:"#333333"
                }}
              >
                Move {index + 1}
              </Grid>
              <Grid item style={{color:"#666666"}}>{move.name}</Grid>
            </Grid>
          ))}
      </Container>
    </>
  );
};

export default PokemonMoves;
