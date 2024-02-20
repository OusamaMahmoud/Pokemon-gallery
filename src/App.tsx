import { Button } from "@mui/material";
import useStyles from "./styles";
const App = () => {
  const classes = useStyles().classes;
  return (
    <div>
      <Button className={classes.button}>Hello!</Button>
    </div>
  );
};

export default App;
