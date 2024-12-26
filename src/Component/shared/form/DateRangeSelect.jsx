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
          defaultValue={[dayjs(), dayjs()]}
          render={({ field }) => (
            <DateRangePicker
              {...field}
              className={className}
              label={label}
              onChange={(date) => {
                field.onChange(date);
              }}
              error={!!errors?.[name]}
              helpertext={errors?.[name]?.message}
              renderInput={(startProps, endProps) => (
                <>
                  <TextField
                    {...startProps}
                    placeholder={placeholder || "Start Date"}
                  />
                  <TextField
                    {...endProps}
                    placeholder={placeholder || "End Date"}
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