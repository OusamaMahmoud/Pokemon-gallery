import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()(() => {
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
      backgroundColor: "#efe9e9",
      height: "270px",
    },
    cardContent: {
      flexGrow: 1,
    },
    paginationBNutton: {
      backgroundColor: "#d6393a",
      minWidth: "120px",
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
    detailsPageButton: {
      color: "GrayText",
      padding: "10",
      borderRadius: "0px",
      marginRight: "10px",
    },
    scrollableContainer: {
      maxHeight: "250px",
      overflowY: "auto",
      "&::-webkit-scrollbar": {
        width: "12px",
      },
      "&::-webkit-scrollbar-track": {
        background: "#f1f1f1",
      },
      "&::-webkit-scrollbar-thumb": {
        background: "#888",
        borderRadius: "6px",
      },
      "&::-webkit-scrollbar-thumb:hover": {
        background: "#555",
      },
    },
  };
});
export default useStyles;
