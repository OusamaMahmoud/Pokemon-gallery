import { CssBaseline, Container } from "@mui/material";
import NavBar from "./components/NavBar";
import useStyles from "./styles";
import PokemonGrid from "./components/PokemonGrid";
import { useSearchText } from "./contexts/SearchTextContext";

const App = () => {
  const classes = useStyles().classes;
  const { searchText } = useSearchText();
  return (
    <>
      <CssBaseline />
      <NavBar />
      <main style={{ padding: "80px 0px" }}>
        <Container maxWidth="md" className={classes.cardGrid}>
          <PokemonGrid searchText={searchText} />
        </Container>
      </main>
    </>
  );
};

export default App;
