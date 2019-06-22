import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Popover from "@material-ui/core/Popover";
import Typography from "@material-ui/core/Typography";
import Definition from "./Definition";

const useStyles = makeStyles(theme => ({
  typography: {
    padding: theme.spacing(2),
    maxHeight: "15em",
    maxWidth: "30em",
    overflow: "auto",
    backgroundColor: "rgba(255, 188, 45, 0.5)"
  }
}));

export default function Tooltip({ anchorEl, handleClose, definition, error }) {
  const classes = useStyles();

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : null;

  return (
    <div>
      <Popover
        id={id}
        open={open}
        className={classes.popover}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "center"
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center"
        }}
      >
        <Typography className={classes.typography}>
          {definition && !error ? (
            <Definition definition={definition} />
          ) : (
            error
          )}
        </Typography>
      </Popover>
    </div>
  );
}
