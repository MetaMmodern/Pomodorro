import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => {
  return {
    changeBlock: {
      "& h3": {
        fontWeight: 400,
      },
    },
    currentUsername: {
      fontWeight: "bold",
    },
    BlockTitle: {
      display: "flex",
      alignItems: "center",
    },
    container: {
      padding: theme.spacing(2),
      paddingTop: 0,
    },
  };
});
