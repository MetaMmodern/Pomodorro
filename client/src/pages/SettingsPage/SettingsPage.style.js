import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => {
  const standartPadding = 16;
  return {
    Settings: {
      paddingTop: 56 + standartPadding,
      marginLeft: theme.spacing(2),
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(4),
      [`${theme.breakpoints.up("xs")} and (orientation: landscape)`]: {
        paddingTop: 48 + standartPadding,
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
      },
      [theme.breakpoints.up("sm")]: {
        paddingTop: 64 + standartPadding,
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
      },
      [theme.breakpoints.up("md")]: {
        marginLeft: theme.spacing(5),
        marginRight: theme.spacing(5),
      },
    },
    settingTitle: {
      fontWeight: "400",
      paddingBottom: theme.spacing(2),
    },
  };
});
