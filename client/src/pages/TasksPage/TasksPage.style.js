import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => {
  const standartPadding = 16;
  return {
    TasksPage: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      paddingTop: 56 + standartPadding,
      [`${theme.breakpoints.up("xs")} and (orientation: landscape)`]: {
        paddingTop: 48 + standartPadding,
      },
      [theme.breakpoints.up("sm")]: {
        paddingTop: 64 + standartPadding,
      },
    },
  };
});
