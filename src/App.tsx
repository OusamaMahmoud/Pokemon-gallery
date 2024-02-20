import { CssBaseline, Container } from "@mui/material";
import NavBar from "./components/NavBar";
import useStyles from "./styles";
import PokemonGrid from "./components/PokemonGrid";
import { useState } from "react";

const App = () => {
  const classes = useStyles().classes;
  const [searchText, setSearchText] = useState("");
  return (
    <>
      <CssBaseline />
      <NavBar onSearch={(searchText) => setSearchText(searchText)} />
      <main style={{ padding: "80px 0px" }}>
        <Container maxWidth="md" className={classes.cardGrid}>
          <PokemonGrid searchText={searchText} />
        </Container>
      </main>
    </>
  );
};

export default App;
