import { CssBaseline, Container } from "@mui/material";
import PokemonGrid from "../components/PokemonGrid";
import useStyles from "../styles";
import { useSearchText } from "../contexts/SearchTextContext";

const Home = () => {
  const classes = useStyles().classes;
  const { searchText } = useSearchText();

  return (
    <>
      <CssBaseline />
      <main style={{ padding: "80px 0px" }}>
        <Container maxWidth="md" className={classes.cardGrid}>
          <PokemonGrid searchText={searchText} />
        </Container>
      </main>
    </>
  );
};

export default Home;
