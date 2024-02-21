import { Grid } from "@mui/material";
import { PokemonDetails } from "../hooks/usePokemonDetails";

interface Props {
  qualities: PokemonDetails;
}

const PokemonStats = ({ qualities }: Props) => {
  return (
    <>
      {qualities &&
        qualities.stats.map(({ stat, base_stat }) => (
          <Grid container justifyContent={"space-between"}>
            <Grid
              item
              style={{
                borderRight: "2px solid red",
                minWidth: "300px",
                paddingBottom: "18px",
                textTransform: "capitalize",
                fontWeight: "600",
              }}
            >
              {stat.name}
            </Grid>
            <Grid item>{base_stat}</Grid>
          </Grid>
        ))}
    </>
  );
};

export default PokemonStats;
