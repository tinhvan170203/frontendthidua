import { TextField } from "@mui/material";
import React from "react";
import { Controller } from "react-hook-form";


export const InputField = (props) => {
  const { name, label, disabled, form,type,value } = props;
 
  const {
    formState: { errors },
    formState,
  } = form; // trong react-hook-form API có giải thích

  const hasError = errors[name] && formState.touchedFields[name];

  return (
    <Controller
      control={form.control}
      name={name}
      render={({ field }) => (
        <TextField
          name={name}
          // focused
          sx={{
            "& .MuiFormHelperText-root": {color: '#d32f2f'},//styles the label
            // "& .MuiOutlinedInput-root": {
            //   "& > fieldset": { borderColor: "green" },
            // },
            // "& .MuiOutlinedInput-root:hover": {
            //   "& > fieldset": {
            //     borderColor: "blue",
            //     borderWidth: '1px'
            //   }
            // }
          }}
          multiline
          value={value}
          {...field}
          type={type}
          maxRows={3}
          margin="normal"
          label={label}
          fullWidth
          size="small"
          disabled={disabled}
          error={hasError}
          helperText={errors[name]?.message}
        />
      )}
    />
  );
};
