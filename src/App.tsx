import { CssBaseline, Container } from "@mui/material";
import NavBar from "./components/NavBar";
import useStyles from "./styles";
import PokemonGrid from "./components/PokemonGrid";

const App = () => {
  const classes = useStyles().classes;
  return (
    <>
      <CssBaseline />
      <NavBar />
      <main style={{ padding: "80px 0px" }}>
        <Container maxWidth="md" className={classes.cardGrid}>
          <PokemonGrid  />
        </Container>
      </main>
    </>
  );
};

export default App;
