import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Controller } from "react-hook-form";

const FormInputSelect = ({
  name,
  placeholder,
  control,
  label,
  options,
  errors,
  defaultValue,
  className,
}) => {
  return (
    <>
      <FormControl fullWidth error={!!errors?.[name]}>
        <InputLabel className={className}>{label}</InputLabel>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValue || ""}
          render={({ field }) => (
            <Select label={label} id={name}placeholder={placeholder} {...field} className={className}>
              {options?.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {errors?.[name] && (
          <FormHelperText>{errors[name]?.message}</FormHelperText>
        )}
      </FormControl>
    </>
  );
};

export default FormInputSelect;
