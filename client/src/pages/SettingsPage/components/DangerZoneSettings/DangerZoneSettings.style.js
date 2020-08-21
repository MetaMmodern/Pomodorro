import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => {
  return {
    container: {
      padding: `0px ${theme.spacing(2)}px`,
    },
    buttonCell: {
      display: "flex",
      justifyContent: "center",
    },
    fullPaper: {
      // this was made to
      // stretch red buttons for whole height
      // but i could not find out how to do that
      // height: `calc(100% - ${theme.spacing(7)}px)`,
    },
  };
});
