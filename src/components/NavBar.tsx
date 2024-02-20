import {
  Alert,
  AppBar,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import useStyles from "../styles";
import { useRef, useState } from "react";

interface Props {
  onSearch: (searchText: string) => void;
}
const NavBar = ({ onSearch }: Props) => {
  const [error, setError] = useState("");
  const classes = useStyles().classes;
  const ref = useRef<HTMLInputElement>(null);
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const searchText = ref.current?.value.trim();
    if (!searchText) {
      setError("Please enter a search query.");
      return;
    }
    if (!isNaN(Number(searchText))) {
      setError("Numeric values are not allowed in the search query.");
      return;
    }
    onSearch(searchText);
    setError("");
  };
  return (
    <AppBar position="relative" className={classes.navBar}>
      <Toolbar>
        <Grid container justifyContent={"space-between"} alignItems={"center"}>
          <Grid item className={classes.flex}>
            <img src="src/assets/pokeAPI_logo.png" width={100} />
            <Typography variant="h5" style={{ color: "white" }}>
              Pokemon Gallary
            </Typography>
          </Grid>
          <Grid item>
            <form onSubmit={handleSubmit}>
              <TextField
                variant="outlined"
                placeholder="Search.."
                inputRef={ref}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <IconButton aria-label="search">
                        <SearchIcon style={{ color: "#e0dada" }} />
                      </IconButton>
                    </InputAdornment>
                  ),
                  style: {
                    borderRadius: "8px",
                  },
                  inputProps: {
                    style: { color: "white" },
                  },
                }}
                InputLabelProps={{
                  style: { color: "white" },
                }}
              />
            </form>
          </Grid>
        </Grid>
      </Toolbar>
      {error && <Alert color="error">{error}</Alert>}
    </AppBar>
  );
};

export default NavBar;
