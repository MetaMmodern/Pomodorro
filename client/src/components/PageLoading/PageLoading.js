import React from "react";
import { CircularProgress } from "@material-ui/core";

import useStyles from "./PageLoading.style";

const PageLoading = () => {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <CircularProgress size={180} />
    </div>
  );
};

export default PageLoading;
