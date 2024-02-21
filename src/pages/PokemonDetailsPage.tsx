import { Box, CircularProgress } from "@mui/material";
import  { useEffect } from "react";
import { useParams } from "react-router-dom";

const PokemonDetailsPage = () => {
  const { slug } = useParams();
  useEffect(() => {
    console.log(slug);
  }, [slug]);

  return (
    <Box>
      <CircularProgress size="lg" />!
    </Box>
  );
};

export default PokemonDetailsPage;
