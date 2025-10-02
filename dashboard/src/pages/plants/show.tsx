import { Stack, Typography } from "@mui/material";
import { useOne, useShow } from "@refinedev/core";
import {
  DateField,
  MarkdownField,
  NumberField,
  Show,
  TextFieldComponent as TextField,
} from "@refinedev/mui";

export const PlantShow = () => {
  const { query } = useShow({});

  const { data, isLoading } = query;

  const record = data?.data;

  const {
    result: location,
    query: { isLoading: locationIsLoading },
  } = useOne({
    resource: "locations",
    id: record?.location?.id || "",
    queryOptions: {
      enabled: !!record,
    },
  });

  return (
    <Show isLoading={isLoading}>
      <Stack gap={1}>
        <Typography variant="body1" fontWeight="bold">
          {"ID"}
        </Typography>
        <TextField value={record?.id} />

        <Typography variant="body1" fontWeight="bold">
          {"Name"}
        </Typography>
        <TextField value={record?.name} />

        <Typography variant="body1" fontWeight="bold">
          {"Species"}
        </Typography>
        <MarkdownField value={record?.species} />

        <Typography variant="body1" fontWeight="bold">
          {"Location"}
        </Typography>
        {locationIsLoading ? <>Loading...</> : <>{location?.name}</>}
      </Stack>
    </Show>
  );
};
