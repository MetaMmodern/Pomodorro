const { makeStyles } = require("@material-ui/core");

export default makeStyles((theme) => {
  return {
    oneBlock: {
      margin: theme.spacing(2),
      display: "flex",
      alignItems: "center",
      "& div": { display: "flex", alignItems: "center" },
    },
    BlockTitle: {
      display: "flex",
      alignItems: "center",
    },
    saveContainer: {
      display: "flex",
      justifyContent: "flex-end",
    },
  };
});
