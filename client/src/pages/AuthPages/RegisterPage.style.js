import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => {
  const standartPadding = 16;
  return {
    AuthBlock: {
      display: "flex",
      width: "100%",
      justifyContent: "center",
      paddingTop: 56 + standartPadding,
      [`${theme.breakpoints.up("xs")} and (orientation: landscape)`]: {
        paddingTop: 48 + standartPadding,
      },
      [theme.breakpoints.up("sm")]: {
        paddingTop: 64 + standartPadding,
      },
    },
    AuthBlock__container: {
      width: "30rem",
      maxWidth: "70%",
      padding: "1rem 2rem",
    },
    AuthBlock__input: { marginBottom: "2rem", width: "100%" },
    AuthBlock__AuthBtn: { marginBottom: "2rem" },
    AuthBlock__NoAcc: { fontSize: "0.9rem", textAlign: "right" },
  };
});
