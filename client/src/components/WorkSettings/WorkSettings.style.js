const { makeStyles } = require("@material-ui/core");

export default makeStyles((theme) => {
  return {
    oneBlock: {
      margin: theme.spacing(2),
      display: "flex",
      alignItems: "center",
      "& span": {
        marginRight: theme.spacing(2),
      },
    },
    saveContainer: {
      display: "flex",
      justifyContent: "flex-end",
    },
  };
});
