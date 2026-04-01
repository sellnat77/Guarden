import { GRAPHQL_SERVER_CODEGEN } from "../components/constants";
import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: `${GRAPHQL_SERVER_CODEGEN}/graphql`,
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
