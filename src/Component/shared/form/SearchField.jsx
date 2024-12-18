import { FormControl } from "@mui/material";
import TextField from "@mui/material/TextField";
import { Controller } from "react-hook-form";
export default function SearchField({
  name,
InputProps,
defaultValue,
  control,
  label,
  inputType,
  className,
  placeholder,
  errors,
  onChange
}) {
  return (
    <FormControl fullWidth  className={className}> 
      <Controller
        name={name}
        control={control}
        defaultValue={defaultValue}
        className={className}
        render={({ field, fieldState }) => (
          <TextField
            InputLabelProps={{ shrink: true }}
            {...field}
            className={className}
            label={label}
            placeholder={placeholder}
            type={inputType}
            variant="outlined"
            InputProps={InputProps}
            onChange={onChange}
            error={!!errors?.[name]}
            helperText={errors?.[name]?.message}
          />
        )}
      />
    </FormControl>
  );
}