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
      <FormControl label={label} fullWidth error={!!errors?.[name]}>
        <InputLabel className={className}>{label}</InputLabel>
        <Controller
          label={label}
          name={name}
          control={control}
          defaultValue={defaultValue || ""}
          render={({ field }) => (
            <Select
            id={name}
            placeholder={placeholder}
            {...field}
            className={className}
            >
              {options?.map((option) => (
                <MenuItem
                  key={option.value || option}
                  value={option.value || option}
                >
                  {option.label || option}
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
