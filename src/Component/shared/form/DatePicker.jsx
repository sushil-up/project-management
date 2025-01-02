import { FormControl, TextField } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Controller } from "react-hook-form";
import dayjs from "dayjs";
export default function DateSelect({
  name,
  control,
  label,
  className,
  placeholder,
  value,
  errors
}) {
  return (
    <FormControl fullWidth>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name={name}
          control={control}
          
          render={({ field }) => (
            <DatePicker
  {...field}
  className={className}
  label={label}
  value={dayjs(field.value)} // Convert value to Day.js instance
  placeholder={placeholder}
  onChange={(date) => {
    const isoDate = date ? date.toISOString() : null; // Convert to ISO format
    field.onChange(isoDate); // Trigger react-hook-form's change handler
  }}
  renderInput={(params) => (
    <TextField
      {...params}
      error={!!errors?.[name]}
      helperText={errors?.[name]?.message}
    />
  )}
  defaultValue={dayjs(new Date())}
/>

          )}
        />
      </LocalizationProvider>
    </FormControl>
  );
}