import React, { useState } from "react";
import { InputAdornment, IconButton, TextField } from "@material-ui/core";
import { Visibility, VisibilityOff } from "@material-ui/icons";

const PasswordInput = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = (e) => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  };

  return (
    <TextField
      id={props.id}
      label={props?.label}
      required={props?.required || false}
      type={showPassword ? "text" : "password"}
      size={props.size || "medium"}
      variant={props.variant || "standard"}
      value={props.value}
      onChange={props.handleValueChange}
      className={props.className || ""}
      autoFocus={props?.autoFocus || false}
      error={props.error}
      helperText={props.helperText}
      autoComplete={props?.autoComplete || "off"}
      InputProps={{
        endAdornment: (
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={handleClickShowPassword}
              onMouseDown={handleMouseDownPassword}
              edge="end"
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
};

export default PasswordInput;
