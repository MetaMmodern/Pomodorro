import { makeStyles } from "@material-ui/core";

export default makeStyles((theme) => ({
  AuthBlock: {
    display: "flex",
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  AuthBlock__container: {
    width: "25rem",
    maxWidth: "70%",
    padding: "1rem 2rem",
  },
  AuthBlock__input: { marginBottom: "2rem", width: "100%" },
  AuthBlock__AuthBtn: { marginBottom: "2rem" },
  AuthBlock__Alert: { marginBottom: "2rem" },
  AuthBlock__NoAcc: { fontSize: "0.9rem", textAlign: "right" },
}));
