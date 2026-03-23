import { GRAPHQL_SERVER } from "../components/constants";
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: `${GRAPHQL_SERVER}/graphql`,
  documents: ["src/**/*.{ts,tsx}"],
  generates: {
    "./src/data/gql/": {
      preset: "client",
      config: {
        useTypeImports: true,
      },
    },
  },
};
export default config;
