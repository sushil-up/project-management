import { FormControl } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { Controller } from "react-hook-form";
import { TextField } from "@mui/joy";
import dayjs from "dayjs";

export default function DateRangeSelect({
  name,
  control,
  label,
  className,
  placeholder,
  errors,
}) {
  return (
    <FormControl fullWidth>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Controller
          name={name}
          control={control}
          defaultValue={[dayjs(), dayjs()]} // Ensure defaultValue is dayjs objects
          render={({ field }) => (
            <DateRangePicker
              {...field}
              value={
                field.value?.map((date) => (date ? dayjs(date) : null)) || [] // Ensure values are dayjs objects
              }
              onChange={(date) => {
                field.onChange(date?.map((d) => (d ? dayjs(d) : null)));
              }}
              className={className}
              renderInput={(startProps, endProps) => (
                <>
                  <TextField
                    {...startProps}
                    placeholder={placeholder || "Start Date"}
                    error={!!errors?.[name]}
                    helperText={errors?.[name]?.message}
                  />
                  <TextField
                    {...endProps}
                    placeholder={placeholder || "End Date"}
                    error={!!errors?.[name]}
                    helperText={errors?.[name]?.message}
                  />
                </>
              )}
            />
          )}
        />
      </LocalizationProvider>
    </FormControl>
  );
}
