import React from "react";
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { Controller } from "react-hook-form";

const FormSelect = ({
  name,
  control,
  label,
  options,
  errors,
  defaultValues,
  className,
  multiple = false,
  onChange,
}) => {
  return (
    <>
      <FormControl fullWidth error={!!errors?.[name]}>
        <InputLabel className={className}>{label}</InputLabel>
        <Controller
          name={name}
          control={control}
          defaultValue={defaultValues}
          render={({ field }) => (
            <Select
              id={name}
              className={className}
              {...field}
              multiple={multiple}
              value={field.value}
              label={label}
              onChange={(e) => {
                field.onChange(e);
                onChange?.(e);
              }}
              displayEmpty
            >
              <MenuItem
                value={defaultValues}
                disabled
                style={{ display: "none" }}
              >
                {defaultValues}
              </MenuItem>
              {options?.map((option, index) => (
                <MenuItem key={index} value={option} className="capitalize">
                  {option}
                </MenuItem>
              ))}
            </Select>
          )}
        />
        {errors?.[name] && (
          <FormHelperText>{errors[name].message}</FormHelperText>
        )}
      </FormControl>
    </>
  );
};

export default FormSelect;
