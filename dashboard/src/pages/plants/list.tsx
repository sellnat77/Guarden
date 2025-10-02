import { DataGrid, type GridColDef } from "@mui/x-data-grid";
import { useMany } from "@refinedev/core";
import {
  DateField,
  DeleteButton,
  EditButton,
  List,
  ShowButton,
  useDataGrid,
} from "@refinedev/mui";
import { Typography } from "@mui/material";
import React from "react";

export const PlantList = () => {
  const { result, dataGridProps } = useDataGrid({});

  const locationIds = dataGridProps.rows.map((item) => {
    return item.location.id;
  });

  const {
    result: { data: locations },
    query: { isLoading: locationIsLoading },
  } = useMany({
    resource: "locations",
    ids: locationIds,
    queryOptions: {
      enabled: !!result?.data,
    },
  });

  const columns = React.useMemo<GridColDef[]>(
    () => [
      {
        field: "id",
        headerName: "ID",
        type: "number",
        minWidth: 50,
        display: "flex",
        align: "left",
        headerAlign: "left",
      },
      {
        field: "name",
        headerName: "Name",
        minWidth: 200,
        display: "flex",
      },
      {
        field: "species",
        flex: 1,
        headerName: "Species",
        minWidth: 250,
        display: "flex",
        renderCell: function render({ value }) {
          if (!value) return "-";
          return (
            <Typography
              component="p"
              whiteSpace="pre"
              overflow="hidden"
              textOverflow="ellipsis"
            >
              {value}
            </Typography>
          );
        },
      },
      {
        field: "location",
        headerName: "Location",
        minWidth: 160,
        display: "flex",
        valueGetter: (_, row) => {
          const value = row.location.name;
          return value;
        },
        renderCell: function render({ value }) {
          return locationIsLoading ? (
            <>Loading...</>
          ) : (
            locations?.find((item) => item.id === value)?.name
          );
        },
      },
      {
        field: "actions",
        headerName: "Actions",
        align: "right",
        headerAlign: "right",
        minWidth: 120,
        sortable: false,
        display: "flex",
        renderCell: function render({ row }) {
          return (
            <>
              <EditButton hideText recordItemId={row.id} />
              <ShowButton hideText recordItemId={row.id} />
              <DeleteButton hideText recordItemId={row.id} />
            </>
          );
        },
      },
    ],
    [locations, locationIsLoading]
  );

  return (
    <List>
      <DataGrid {...dataGridProps} columns={columns} />
    </List>
  );
};
