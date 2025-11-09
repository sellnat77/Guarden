import { Autocomplete, Box, TextField } from "@mui/material";
import { Create, useAutocomplete } from "@refinedev/mui";
import { useForm } from "@refinedev/react-hook-form";
import React from "react";
import { Controller, FieldErrors } from "react-hook-form";

export const PlantCreate = () => {
  const {
    saveButtonProps,
    refineCore: { formLoading },
    register,
    control,
    formState: { errors },
  } = useForm({});

  const { autocompleteProps: locationAutocompleteProps } = useAutocomplete({
    resource: "locations",
  });

  return (
    <Create isLoading={formLoading} saveButtonProps={saveButtonProps}>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column" }}
        autoComplete="off"
      >
        <TextField
          {...register("name", {
            required: "This field is required",
          })}
          error={!!(errors as FieldErrors)?.name}
          helperText={!!(errors as FieldErrors)?.name?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          type="text"
          label={"Name"}
          name="name"
        />
        <TextField
          {...register("species", {
            required: "This field is required",
          })}
          error={!!(errors as FieldErrors)?.species}
          helperText={!!(errors as FieldErrors)?.species?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          multiline
          label={"Species"}
          name="species"
        />
        <TextField
          {...register("notes", {
            required: "This field is required",
          })}
          error={!!(errors as FieldErrors)?.notes}
          helperText={!!(errors as FieldErrors)?.notes?.message}
          margin="normal"
          fullWidth
          InputLabelProps={{ shrink: true }}
          multiline
          label={"Notes"}
          name="notes"
        />
        <Controller
          control={control}
          name={"location"}
          rules={{ required: "This field is required" }}
          // eslint-disable-next-line
          defaultValue={null as any}
          render={({ field }) => (
            <Autocomplete
              {...locationAutocompleteProps}
              {...field}
              onChange={(_, value) => {
                field.onChange(value);
              }}
              getOptionLabel={(item) => item.name || ""}
              isOptionEqualToValue={(option, value) => {
                const optionId = option?.id?.toString();
                const valueId =
                  typeof value === "object"
                    ? value?.id?.toString()
                    : value?.toString();
                return value === undefined || optionId === valueId;
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={"Location"}
                  margin="normal"
                  variant="outlined"
                  required
                />
              )}
            />
          )}
        />
      </Box>
    </Create>
  );
};
