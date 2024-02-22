import { CssBaseline, Container } from "@mui/material";
import PokemonGrid from "../components/PokemonGrid";
import useStyles from "../styles";

const Home = () => {
  const classes = useStyles().classes;

  return (
    <>
      <CssBaseline />
      <main style={{ padding: "80px 0px" }}>
        <Container maxWidth="md" className={classes.cardGrid}>
          <PokemonGrid  />
        </Container>
      </main>
    </>
  );
};

export default Home;
