import { Button, Container, Grid } from "@mui/material";
import useStyles from "../styles";

interface Props {
  totalPages: number;
  currentPage: number;
  onPrevious: (num: number) => void;
  onNext: (current: number) => void;
}

const Footer = ({ currentPage, totalPages, onPrevious, onNext }: Props) => {
  const classes = useStyles().classes;
  const handlePreviousButton = () => {
    if (currentPage > 1) {
      onPrevious(currentPage - 1);
    }
  };
  const handleNextButton = () => {
    if (currentPage < totalPages) {
      onNext(currentPage + 1);
    }
  };
  return (
    <Container maxWidth="sm" style={{ padding: "80px 0px" }}>
      <div>
        <Grid container spacing={2} justifyContent={"space-around"}>
          <Grid item>
            <Button
              onClick={handlePreviousButton}
              variant="contained"
              disabled={currentPage === 1}
              className={`${currentPage != 1 && classes.paginationBNutton}`}
            >
              PREVIOUS
            </Button>
          </Grid>
          <Grid item>
            <Button
              onClick={handleNextButton}
              variant="contained"
              disabled={currentPage === totalPages}
              className={`${
                currentPage != totalPages && classes.paginationBNutton
              }`}
            >
              NEXT
            </Button>
          </Grid>
        </Grid>
      </div>
    </Container>
  );
};

export default Footer;
