import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => {
  return {
    navBar: {
      backgroundColor: "#f15a5a",
    },
    flex: {
      display: "flex",
      alignItems: "center",
      gap: 5,
    },
    cardGrid: {
      padding: "20px 0px",
    },
    card: {
      height: "100%",
      display: "flex",
      flexDirection: "column",
    },
    cardMedia: {
      paddingTop: "56.25%", // 16:9 aspect ratio
      backgroundColor:"#efe9e9",
      height:"270px",
    },
    cardContent: {
      flexGrow: 1,
    },
   paginationBNutton:{
    backgroundColor:"#d6393a",
    minWidth: "120px"
   },
    pokeType: {
      padding: "10px",
      borderRadius: "20px",
      color: "black",
      fontWeight: "600",
      minWidth: "60px",
      textAlign: "center",
      textTransform: "capitalize",
    },
  };
});
export default useStyles;
